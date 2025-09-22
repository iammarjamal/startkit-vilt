<?php

namespace App\Notifications\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class SecurityAlertNotification extends Notification
{
    use Queueable;

    public $user, $loginTime, $ipAddress, $device, $location, $locale;

    public function __construct($user, $loginTime, $ipAddress, $device, $location, $locale = null)
    {
        $this->user = $user;
        $this->loginTime = $loginTime;
        $this->ipAddress = $ipAddress;
        $this->device = $device;
        $this->location = $location;
        $this->locale = $locale ?? ($user->locale ?? app()->getLocale());
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $locale = $this->locale;
        // Use custom layout and translation
        return (new MailMessage)
            ->subject(__('mail.security.subject', [], $locale))
            ->view('mail.auth.security-alert', [
                'user' => $this->user,
                'locale' => $locale,
                'loginTime' => $this->loginTime,
                'ipAddress' => $this->ipAddress,
                'device' => $this->device,
                'location' => $this->location,
                'title' => __('mail.security.subject', [], $locale),
                'headerSubtitle' => '',
                'footerText' => __('mail.security_footer', [], $locale),
            ]);
    }
}
