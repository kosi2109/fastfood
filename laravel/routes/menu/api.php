<?php

use App\Http\Controllers\MenuController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'menus'], function() {
    Route::get('/',[MenuController::class,'index']);
    Route::post('/',[MenuController::class,'store']);
    Route::get('/discount',[MenuController::class,'discountMenus']);
    Route::get('/random/{id}',[MenuController::class,'randomMenus']);
    Route::get('/{slug}',[MenuController::class,'show']);
    Route::put('/{menu:slug}/update',[MenuController::class,'update']);
    Route::delete('/{menu:slug}/delete',[MenuController::class,'destroy']);
});