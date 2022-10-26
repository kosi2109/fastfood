<?php

use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

require __DIR__ . "/menu/api.php";
require __DIR__. "/banner/api.php";
require __DIR__ ."/category/api.php";
require __DIR__. "/size/api.php";
require __DIR__. "/order/api.php";

Route::group(["middleware"=>"auth:sanctum"],function() {
    
    Route::post('/logout',[ApiAuthController::class,'logout']);

    Route::get('/user',[UserController::class,'show']);

    Route::put('/user',[UserController::class,'update']);
});

// auth
Route::post('/login',[ApiAuthController::class,'login'])->name('login');

Route::post('/register',[ApiAuthController::class,'register']);

Route::get('/google-auth', [ApiAuthController::class, 'redirectToAuth']);

Route::get('/google-auth/callback', [ApiAuthController::class, 'handleAuthCallback']);