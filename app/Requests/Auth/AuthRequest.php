<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use App\Notifications\Auth\OtpNotification;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Spatie\OneTimePasswords\Actions\ConsumeOneTimePasswordAction;
use Spatie\OneTimePasswords\Actions\CreateOneTimePasswordAction;

class AuthRequest extends FormRequest
{
    protected ?string $otp = null;
    public function rules()
    {
        $rules = [
            'email' => 'required|email|max:255',
            'otp' => 'nullable|string|size:6'
        ];

        return $rules;
    }

    public function sendOtpRequest(array $options = [])
    {
        // Validate the request data
        $email = $this->validated('email');

        // Find or create the user by email
        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => strstr($email, '@', true) ?: $email,
                'password' => Hash::make(Str::random(32)),
                'email_verified_at' => null,
            ]
        );

        // Generate a one-time password (OTP)
        $otp = app(CreateOneTimePasswordAction::class)->execute($user);
        $this->otp = (string) (is_object($otp) && isset($otp->password) ? $otp->password : $otp);

        // get the current locale
        $locale = LaravelLocalization::getCurrentLocale();

        // Create a verification URL with the OTP
        $verifyUrl = null;
        if (($options['withLink'] ?? false)) {
            $verifyUrl = route('auth.verify') . '?' . http_build_query([
                'otp' => $this->otp,
                'email' => $email,
            ]);
        }

        // Send the OTP to the user's email
        Notification::send(
            $user,
            $verifyUrl
                ? new OtpNotification($this->otp, $user, $locale, $verifyUrl)
                : new OtpNotification($this->otp, $user, $locale)
        );

        // Store the email in the session for later verification
        $this->session()->put('otp_email', $email);

        // Return the user object
        return $user;
    }

    public function handleVerification()
    {
        $email = $this->validated('email');
        $otp = (string) $this->validated('otp', ['otp' => 'required|string|size:6']);

        $user = User::where('email', $email)->first();

        $result = app(ConsumeOneTimePasswordAction::class)->execute($user, $otp, $this);
        if (! $result->isOk()) {
            return false;
        } else {
            Auth::login($user, remember: true);
            $user = Auth::user();

            DB::table('sessions')
                ->where('id', session()->getId())
                ->update(['user_id' => $user->id]);

            $ids = $this->session()->get('authenticated_account_ids', []);
            $ids = is_array($ids) ? $ids : [];

            if (! in_array($user->getKey(), $ids)) {
                $ids[] = $user->getKey();
                $this->session()->put('authenticated_account_ids', $ids);
            }

            $this->session()->forget('otp_email');

            return $user;
        }
    }
}
