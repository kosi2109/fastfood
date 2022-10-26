<?php

use App\Http\Controllers\SizeController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'size'], function() {
    Route::get('/',[SizeController::class,'index']);
    Route::post('/',[SizeController::class,'store']);
    Route::put('/{size}/update',[SizeController::class,'update']);
    Route::delete('/{size}/delete',[SizeController::class,'destroy']);
});