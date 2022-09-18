<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::group(["middleware"=>"auth:sanctum"],function() {
    Route::post('orders',[OrderController::class,'store']);
    Route::get('orders/{id}',[OrderController::class,'show']);
    Route::get('orders',[OrderController::class,'index']);
});
