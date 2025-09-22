<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthRequest;
use App\Models\User;
use App\Notifications\Auth\OtpNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Spatie\OneTimePasswords\Actions\ConsumeOneTimePasswordAction;
use Spatie\OneTimePasswords\Actions\CreateOneTimePasswordAction;

class EmailAuthController extends Controller
{
    /**
     * Display the authentication index page.
     */
    public function index()
    {
        return Inertia::render('auth/index');
    }

    /**
     * Display the login page.
     */
    public function login()
    {
        return Inertia::render('auth/login');
    }

    /**
     * Display the verification page.
     */
    public function verify(Request $request)
    {
        // Get email and OTP from query parameters
        $email = $request->query('email') ?? $request->session()->get('otp_email');
        $otp   = $request->query('otp');

        // Ensure email is provided
        if (!$email || !($user = User::where('email', $email)->first())) {
            return redirect()->route('auth.login');
        }

        // Ensure the email in session matches the requested email
        if ($request->session()->get('otp_email') !== $email) {
            return redirect()->route('auth.login');
        }

        // Render the verification page with email and OTP
        return Inertia::render('auth/verify', compact('email', 'otp'));
    }


    /**
     * Send OTP to user's email.
     */
    public function sendOtp(AuthRequest $request)
    {
        $user = $request->sendOtpRequest(['withLink' => true]);

        return to_route('auth.verify', ['email' => $user->email]);
    }

    /**
     * Resend OTP to user's email.
     */
    public function resendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        try {
            $email = $request->email;
            $sessionEmail = $request->session()->get('otp_email');

            // Verify email matches session
            if ($sessionEmail !== $email) {
                return back()->with('error', 'البريد الإلكتروني غير مطابق للجلسة الحالية');
            }

            $user = User::where('email', $email)->first();

            if (!$user) {
                return back()->with('error', 'المستخدم غير موجود');
            }

            // Generate new OTP
            $otp = app(CreateOneTimePasswordAction::class)->execute($user);
            $otpCode = (string) (is_object($otp) && isset($otp->password) ? $otp->password : $otp);

            $locale = LaravelLocalization::getCurrentLocale();

            // Create verification URL with OTP
            $verifyUrl = route('auth.verify') . '?' . http_build_query([
                'otp' => $otpCode,
                'email' => $email,
            ]);

            // Send notification
            Notification::send(
                $user,
                new OtpNotification($otpCode, $user, $locale, $verifyUrl)
            );

            return back()->with('success', 'تم إعادة إرسال رمز التحقق إلى بريدك الإلكتروني');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء إعادة إرسال رمز التحقق');
        }
    }

    /**
     * Verify OTP and authenticate user.
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string|size:6',
        ]);

        try {
            $email = $request->email;
            $otp = $request->otp;

            $user = User::where('email', $email)->first();

            if (!$user) {
                throw ValidationException::withMessages([
                    'email' => 'المستخدم غير موجود'
                ]);
            }

            // Verify session email
            $sessionEmail = $request->session()->get('otp_email');
            if ($sessionEmail !== $email) {
                throw ValidationException::withMessages([
                    'email' => 'البريد الإلكتروني غير مطابق للجلسة'
                ]);
            }

            // Consume OTP
            $result = app(ConsumeOneTimePasswordAction::class)->execute($user, $otp, $request);

            if (!$result->isOk()) {
                throw ValidationException::withMessages([
                    'otp' => 'رمز التحقق غير صحيح أو منتهي الصلاحية'
                ]);
            }

            // Login user
            Auth::login($user, remember: true);
            $user = Auth::user();

            // Update session with user ID
            DB::table('sessions')
                ->where('id', session()->getId())
                ->update(['user_id' => $user->id]);

            // Handle multiple account sessions
            $ids = $request->session()->get('authenticated_account_ids', []);
            $ids = is_array($ids) ? $ids : [];

            if (!in_array($user->getKey(), $ids)) {
                $ids[] = $user->getKey();
                $request->session()->put('authenticated_account_ids', $ids);
            }

            // Clear OTP email from session
            $request->session()->forget('otp_email');

            return redirect()->intended('/dashboard')
                ->with('success', 'تم تسجيل الدخول بنجاح!');
        } catch (ValidationException $e) {
            return back()
                ->withErrors($e->errors())
                ->withInput($request->only('email'));
        } catch (\Exception $e) {
            return back()
                ->withInput($request->only('email'))
                ->with('error', 'حدث خطأ أثناء التحقق من الرمز');
        }
    }
}
