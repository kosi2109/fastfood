<?php

namespace App\Providers;

use Exception;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            $array_url = parse_url($url);
            @list(,,,$id,$token) = explode('/', $array_url['path']);

            return (new MailMessage)
                ->subject('Verify Email Address')
                ->line('Click the button below to verify your email address.')
                ->action('Verify Email Address', env('GOOGLE_REDIRECT'). "/email-verify?id=$id&hash=$token&".$array_url['query']);
        });
        
        ResetPassword::toMailUsing(function($user, string $token) {
            return (new MailMessage)
                ->subject('Reset Password Notification')
                ->line('You are receiving this email because we received a password reset request for your account.')
                ->action('Reset Password', env('GOOGLE_REDIRECT')."/reset-password/$token?email=$user->email");
        });
    }
}
