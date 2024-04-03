<?php

namespace App\Http\Controllers;

use App\Models\Groceries;
use Illuminate\Http\Request;
use App\Http\Requests\StoreGroceryRequest;
use App\Http\Resources\GroceryResource;

class GroceriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $grocery = Groceries::create($request->validated());
        return new GroceryResource($grocery);
    }


    /**
     * Display the specified resource.
     */
    public function show(Groceries $groceries)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Groceries $groceries)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Groceries $groceries)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Groceries $groceries)
    {
        //
    }
}
