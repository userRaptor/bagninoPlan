<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GroceriesController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\GroceriesOrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
});

// Authentification
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// Users
Route::get('/users', [UserController::class, 'index']);


// Groceries
Route::post('/groceries', [GroceriesController::class, 'store']);
Route::get('/groceries', [GroceriesController::class, 'index']);
Route::get('/groceries/{id}', [GroceriesController::class, 'getByID']);
Route::delete('/groceries/{id}', [GroceriesController::class, 'deleteByID']);
Route::delete('/groceries', [GroceriesController::class, 'deleteAll']);

// Orders
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'getAllOrders']);
Route::put('/orders/{orderId}', [OrderController::class, 'updateIncludeSummary']);

// Groceries_Order
Route::post('/groceries_order', [GroceriesOrderController::class, 'store']);
Route::get('/groceries_order/{id}', [GroceriesOrderController::class, 'getByOrderId']);
Route::delete('/groceries_order/{id}', [GroceriesOrderController::class, 'deleteByID']);
