<?php

use App\Http\Controllers\MenuController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'menus'], function() {
    Route::get('/',[MenuController::class,'index']);
    Route::get('/{menu:slug}',[MenuController::class,'show']);
    Route::post('/',[MenuController::class,'store']);
    Route::put('/{menu:slug}/update',[MenuController::class,'update']);
    Route::delete('/{menu:slug}/delete',[MenuController::class,'destroy']);
});