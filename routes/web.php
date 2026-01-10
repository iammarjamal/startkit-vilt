<?php

use App\Http\Controllers\Auth\EmailAuthController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\MicrosoftAuthController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

Route::prefix(LaravelLocalization::setLocale())->middleware(['localeSessionRedirect', 'localizationRedirect', 'localeViewPath'])->group(
    function () {

        // Home Route
        Route::get('/', function () {
            return Inertia::render('welcome');
        })->name('home.index');

        // Auth Routes
        Route::prefix('auth')->name('auth.')->middleware(['guest'])->group(
            function () {
                // Email Authentication Routes
                Route::get('/', [EmailAuthController::class, 'index'])->name('index');
                Route::get('/login', [EmailAuthController::class, 'login'])->name('login');
                Route::post('/send-otp', [EmailAuthController::class, 'sendOtp'])->name('send-otp');
                Route::get('/verify', [EmailAuthController::class, 'verify'])->name('verify');
                Route::post('/resend-otp', [EmailAuthController::class, 'resendOtp'])->name('resend-otp');
                Route::post('/verify-otp', [EmailAuthController::class, 'verifyOtp'])->name('verify-otp');

                // OAuth Routes
                Route::get('/google', [GoogleAuthController::class, 'redirect'])->name('google');
                Route::get('/google/callback', [GoogleAuthController::class, 'callback'])->name('google.callback');
                Route::get('/microsoft', [MicrosoftAuthController::class, 'redirect'])->name('microsoft');
                Route::get('/microsoft/callback', [MicrosoftAuthController::class, 'callback'])->name('microsoft.callback');

                // Logout Route
                Route::post('/logout', [AuthController::class, 'logout'])->withoutMiddleware('guest')->middleware('auth')->name('logout');
            }
        );

        // Dashboard Routes
        Route::middleware(['auth'])->group(function () {
            Route::get('/dashboard', function () {
                return Inertia::render('dashboard/index');
            })->name('dashboard');
        });

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/Appearance');
    })->name('appearance');
});
    }
);

// Force SSL
app()->environment('production') ? URL::forceHttps() : null;
