<?php

use App\Http\Controllers\ApiAuthController;
use Illuminate\Support\Facades\Route;

require __DIR__ . "/menu/api.php";
require __DIR__. "/banner/api.php";
require __DIR__ ."/category/api.php";
require __DIR__. "/size/api.php";

Route::group(["middleware"=>"auth:sanctum"],function() {
    Route::post('/logout',[ApiAuthController::class,'logout']);
    Route::get('/user',[ApiAuthController::class,'user']);
});


Route::post('/login',[ApiAuthController::class,'login']);
Route::post('/register',[ApiAuthController::class,'register']);