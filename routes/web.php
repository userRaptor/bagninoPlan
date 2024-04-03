<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GroceriesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


// http://localhost:8000/


Route::get('/', function () {
    return view('welcome');
});


Route::get('groceries', [GroceriesController::class, 'index']);

Route::get('groceries/{id}', [GroceriesController::class, 'getByID']);

Route::delete('groceries', [GroceriesController::class, 'deleteAll']);
