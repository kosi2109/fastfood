<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'categories'], function() {
    Route::get('/',[CategoryController::class,'index']);
    Route::post('/',[CategoryController::class,'store']);
    Route::get('/feature',[CategoryController::class,'getOnlyFeature']);
    Route::put('/{category:slug}/update',[CategoryController::class,'update']);
    Route::delete('/{category:slug}/delete',[CategoryController::class,'destroy']);
});