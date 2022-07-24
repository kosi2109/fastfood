<?php

use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\SizeController;
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
    Route::group(['prefix' => 'categories'], function() {
        Route::post('/',[CategoryController::class,'store']);
        Route::put('/{slug}',[CategoryController::class,'update']);
        Route::delete('/{slug}',[CategoryController::class,'destroy']);
    });
    Route::group(['prefix' => 'menus'], function() {
        Route::post('/',[MenuController::class,'store']);
        Route::put('/{slug}',[MenuController::class,'update']);
        Route::delete('/{slug}',[MenuController::class,'destroy']);
    });

    Route::post('/logout',[ApiAuthController::class,'logout']);
    Route::get('/user',[ApiAuthController::class,'user']);
});


Route::group(['prefix' => 'menus'], function() {
    Route::get('/',[MenuController::class,'index']);
    Route::get('/{slug}',[MenuController::class,'show']);
});

Route::resource('size',SizeController::class);

Route::group(['prefix' => 'categories'], function() {
    Route::get('/',[CategoryController::class,'index']);
    Route::get('/feature',[CategoryController::class,'getOnlyFeature']);
});

Route::group(['prefix' => 'size'], function() {
    Route::get('/',[SizeController::class,'index']);
    Route::post('/',[SizeController::class,'store']);
    Route::put('/{size}',[SizeController::class,'update']);
    Route::delete('/{size}',[SizeController::class,'destroy']);
});

Route::group(['prefix' => 'price'], function() {
    Route::post('/',[PriceController::class,'store']);
    Route::put('/{size}',[PriceController::class,'update']);
    Route::delete('/{size}',[PriceController::class,'destroy']);
});



Route::post('/login',[ApiAuthController::class,'login']);
Route::post('/register',[ApiAuthController::class,'register']);