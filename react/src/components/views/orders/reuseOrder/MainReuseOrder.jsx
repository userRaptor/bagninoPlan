import React from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../../Header';


function MainReuseOrder(){
    const { orderId } = useParams();

    return (
        <div>
            <Header title="Reuse Order" />
            <h1>MainReuseOrder</h1>
            <p>Order ID: {orderId}</p>
        </div>
    )
}

export default MainReuseOrder;