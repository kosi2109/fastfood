<?php

use App\Mail\WelcomeMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\NewPasswordController;

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

Route::get('/playground', function () {
    $user = User::first();
    $body = [
        'name' => $user->name,
        'url_a' => 'https://www.bacancytechnology.com/',
        'url_b' => 'https://www.bacancytechnology.com/tutorials/laravel',
    ];
    Mail::to($user)->send(new WelcomeMail($body));
    return "hi";
});


Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
                ->middleware(['guest:'.config('fortify.guard')])
                ->name('password.reset');

// Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
//     ->middleware(['guest:'.config('fortify.guard')])
//     ->name('password.reset');