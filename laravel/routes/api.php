<?php

use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MenuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(["middleware"=>"auth:sanctum"],function() {
    Route::group(['prefix' => 'menus'], function() {
        Route::post('/',[MenuController::class,'store']);
        Route::put('/{slug}',[MenuController::class,'update']);
        Route::delete('/{slug}',[MenuController::class,'destroy']);
    });

    Route::group(['prefix' => 'categories'], function() {
        Route::post('/',[CategoryController::class,'store']);
        Route::put('/{slug}',[CategoryController::class,'update']);
        Route::delete('/{slug}',[CategoryController::class,'destroy']);
    });

    Route::get('/user',[ApiAuthController::class,'user']);
});


Route::group(['prefix' => 'menus'], function() {
    Route::get('/',[MenuController::class,'index']);
    Route::get('/{slug}',[MenuController::class,'show']);
});


Route::group(['prefix' => 'categories'], function() {
    Route::get('/',[CategoryController::class,'index']);
});


Route::post('/login',[ApiAuthController::class,'login']);
Route::post('/register',[ApiAuthController::class,'register']);