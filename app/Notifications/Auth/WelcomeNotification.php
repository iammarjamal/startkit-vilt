<?php

namespace App\Notifications\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class WelcomeNotification extends Notification
{
    use Queueable;

    public $user;
    public $locale;

    public function __construct($user, $locale = null)
    {
        $this->user = $user;
        $this->locale = $locale ?? ($user->locale ?? app()->getLocale());
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $locale = $this->locale;
        return (new MailMessage)
            ->subject(__('mail.welcome.subject', [], $locale))
            ->view('mail.auth.welcome', [
                'user' => $this->user,
                'locale' => $locale,
            ]);
    }
}
