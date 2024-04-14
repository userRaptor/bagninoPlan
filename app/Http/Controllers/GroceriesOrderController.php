<?php

namespace App\Http\Controllers;

use App\Models\GroceriesOrders;
use Illuminate\Http\Request;

class GroceriesOrderController extends Controller
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
        $validatedData = $request->validate([
            'groceries_id' => 'required|integer',
            'order_id' => 'required|integer',
            'comment' => 'required|string',
            'quantity' => 'required|integer',
        ]);

        $groceriesOrder = GroceriesOrders::create($validatedData);

        return response()->json($groceriesOrder, 201);
    }

/*
    public function getByOrderId($order_id)
    {
        return GroceriesOrders::where('order_id', $order_id)->get();
    }
*/

    public function getByOrderId($order_id)
    {
        return GroceriesOrders::with('groceries')->where('order_id', $order_id)->get();
    }


    /**
     * Display the specified resource.
     */
    public function show(GroceriesOrders $groceriesOrders)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GroceriesOrders $groceriesOrders)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GroceriesOrders $groceriesOrders)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GroceriesOrders $groceriesOrders)
    {
        //
    }
}
