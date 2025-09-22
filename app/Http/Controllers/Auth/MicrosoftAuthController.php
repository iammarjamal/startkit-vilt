<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Laravel\Socialite\Facades\Socialite;
use Exception;

class MicrosoftAuthController extends Controller
{
    /**
     * Redirect the user to the Microsoft authentication page.
     */
    public function redirect()
    {
        return Socialite::driver('microsoft')->redirect();
    }

    /**
     * Obtain the user information from Microsoft.
     */
    public function callback()
    {
        try {
            $microsoftUser = Socialite::driver('microsoft')->user();

            // Find or create user
            $user = User::firstOrCreate(
                ['email' => $microsoftUser->getEmail()],
                [
                    'name' => $microsoftUser->getName(),
                    'email_verified_at' => now(),
                    'microsoft_id' => $microsoftUser->getId(),
                    'provider' => 'microsoft',
                ]
            );

            Auth::login($user);

            return redirect()->intended('/dashboard')
                ->with('success', 'تم تسجيل الدخول بنجاح عبر Microsoft');
        } catch (Exception $e) {
            Log::error('Microsoft OAuth Error: ' . $e->getMessage());
            return redirect('/auth')
                ->with('error', 'حدث خطأ أثناء تسجيل الدخول باستخدام Microsoft: ' . $e->getMessage());
        }
    }
}
