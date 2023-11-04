<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductReviewController;

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
Route::prefix('products')->group(function () {
    Route::get('cloth', [ProductController::class, 'clothIndex']);
    Route::get('cloth/{id}', [ProductController::class, 'clothShow']);
   

    Route::get('trouser', [ProductController::class, 'trouserIndex']);
    Route::get('trouser/{id}', [ProductController::class, 'trouserShow']);


    Route::get('shoes', [ProductController::class, 'shoesIndex']);
    Route::get('shoes/{id}', [ProductController::class, 'shoesShow']);


    Route::delete('reviews/DeleteUserComment/{id}', [ProductReviewController::class, 'deleteComment']);
    Route::get('reviews/UserComment/{id}', [ProductReviewController::class, 'showUserComment']);
    
    Route::put('reviews/editComment/{id}', [ProductReviewController::class, 'updateComment']);
    Route::post('reviews/{id}', [ProductReviewController::class, 'store']);;
});



Route::get('/search', 'App\Http\Controllers\SearchController@search');
