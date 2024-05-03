<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     * getAllOrders
     */
    public function getAllOrders()
    {
        //return Order::query()->orderBy('id', 'desc')->get();
        //return Order::with('groceries')->orderBy('id', 'desc')->get();
        return Order::with(['groceries', 'user'])->orderBy('id', 'desc')->get();
    }



    public function getOrdersByUserId($userId)
    {
        return Order::collection(
            Order::query()->where('user_id', $userId)->orderBy('id', 'desc')->get()
        );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|integer',
            'date' => 'required|date',
            'weekday' => 'required|string',
            'time' => 'required',
            'schoolClass' => 'required|string',
            'location' => 'required|string',
            'purpose' => 'required|string',
            'includeSummary' => 'required|boolean',
        ]);

        $order = Order::create($validatedData);

        return response()->json($order, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return $order->load('groceries');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    public function updateIncludeSummary(Request $request, $orderId)
    {
        // Finde den Eintrag mit der übergebenen ID
        $order = Order::find($orderId);
    
        if ($order) {
            // Aktualisiere den Wert der Spalte 'includeSummary'
            $order->update($request->only('includeSummary'));
        
            return response()->json($order, 200);
        } else {
            // Behandele den Fall, wenn der Eintrag nicht gefunden wurde
            return response()->json(['message' => 'Order not found'], 404);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
