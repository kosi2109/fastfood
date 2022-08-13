<?php

use App\Http\Controllers\BannerController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'banners'], function() {
    Route::get('/',[BannerController::class,'index']);
    Route::post('/',[BannerController::class,'store']);
    Route::put('/{banner}/update',[BannerController::class,'update']);
    Route::delete('/{banner}/delete',[BannerController::class,'destroy']);
});