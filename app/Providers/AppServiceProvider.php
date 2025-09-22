<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Socialite\Facades\Socialite;
use SocialiteProviders\Manager\SocialiteWasCalled;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app['events']->listen(
            SocialiteWasCalled::class,
            '\SocialiteProviders\Google\GoogleExtendSocialite@handle'
        );

        $this->app['events']->listen(
            SocialiteWasCalled::class,
            '\SocialiteProviders\Microsoft\MicrosoftExtendSocialite@handle'
        );
    }
}
