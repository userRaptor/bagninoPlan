import React, { useEffect } from 'react';
import { useState } from 'react';
import axiosClient from "../../../axios-client";



function GroceriesOrders(){

    const fetchGroceriesOrders = () => {
        axiosClient
            .get('/groceries_order/13')
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchGroceriesOrders();
    }  , []);

    return (
        <div>
            <h1>Groceries In Buffer</h1>

        </div>
    );
}

export default GroceriesOrders;