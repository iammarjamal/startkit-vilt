<?php

namespace App\Notifications\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

class OtpNotification extends Notification
{
    use Queueable;

    public $otp;
    public $user;
    public $locale;
    public $verifyUrl;

    /**
     * Create a new notification instance.
     */
    public function __construct($otp, $user, $locale, $verifyUrl = null)
    {
        $this->otp = $otp;
        $this->user = $user;
        $this->locale = $locale;
        $this->verifyUrl = $verifyUrl;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via($notifiable)
    {
        // You can add 'sms', 'database', etc. here
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        app()->setLocale(LaravelLocalization::getCurrentLocale());

        // Use custom layout and translation
        return (new MailMessage)
            ->subject(__('mail.otp.subject', [], $this->locale))
            ->view('mail.auth.otp', [
                'locale' => $this->locale,
                'otp' => $this->otp,
                'user' => $this->user,
                'title' => __('mail.otp.subject', [], $this->locale),
                'headerSubtitle' => '',
                'footerText' => __('mail.otp_footer', [], $this->locale),
                'verifyUrl' => !empty($this->verifyUrl) ? $this->verifyUrl : false,
            ]);
    }
}
