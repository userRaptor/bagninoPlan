import React, { useEffect } from 'react';

import { Button, Text } from "@chakra-ui/react";
import { useState } from 'react';

import axiosClient from '../../../../axios-client';

function CopyGroceries({toCopyOrderId, actualOrderId}) {

    const copyItemsToAnotherOrder = () => {

        const sourceOrderId = +toCopyOrderId;

        const payload = {
            from_order_id: sourceOrderId,
            to_order_id: actualOrderId
        };

        console.log(payload);
    
        axiosClient
            .post("/copyitems", payload)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        //copyItemsToAnotherOrder();

    }, []);


    return(
        <div>
            <Text>CopyGroceries from order: {toCopyOrderId}</Text>
            <Text>actualOrderId from order: {actualOrderId}</Text>

            <Button onClick={copyItemsToAnotherOrder}>Copy</Button>

        </div>
    )
}

export default CopyGroceries;