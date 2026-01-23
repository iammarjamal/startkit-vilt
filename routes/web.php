<?php

use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

Route::prefix(LaravelLocalization::setLocale())->middleware(['localeSessionRedirect', 'localizationRedirect', 'localeViewPath'])->group(
    function () {

        // Home Route
        Route::prefix('/')->name('home.')->group(
            function () {
                
                Route::get('/', function () {
                    return inertia('Welcome');
                })->name('index');
                
            }
        );

        // Auth Routes
        Route::prefix('auth')->name('auth.')->middleware(['guest'])->group(
            function () {
                //
            }
        );

        // Dashboard Routes
        Route::prefix('dashboard')->name('dashboard.')->middleware(['auth'])->group(function () {
            //
        });

    }
);

// Force SSL
app()->environment('production') ? URL::forceHttps() : null;