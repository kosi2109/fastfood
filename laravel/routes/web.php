<?php

use App\Http\Controllers\NewPasswordController as ControllersNewPasswordController;
use App\Mail\WelcomeMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\EmailVerificationNotificationController;
use Laravel\Fortify\Http\Controllers\NewPasswordController;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController;
use Laravel\Fortify\Http\Controllers\VerifyEmailController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');


Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
    ->middleware(['guest:' . config('fortify.guard')])
    ->name('password.reset');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth:sanctum'])
    ->name('verification.send');

Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['auth:sanctum'])
    ->name('verification.verify');

Route::post('/reset-password', [ControllersNewPasswordController::class, 'store'])
    ->middleware(['guest:' . config('fortify.guard')])
    ->name('password.update');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware(['guest:' . config('fortify.guard')])
    ->name('password.email');
