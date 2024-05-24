import React from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../../Header';
import NewOrder from '../newOrder/NewOrder';


function MainReuseOrder(){
    const { orderId } = useParams();

    return (
        <div>
            <Header title="Reuse Order" />
            
            <NewOrder />

            <p>Order ID: {orderId}</p>


        </div>
    )
}

export default MainReuseOrder;