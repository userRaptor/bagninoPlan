import React from 'react';

import { Button, Text } from "@chakra-ui/react";

import axiosClient from "../../../../axios-client";

function CopyGroceries({toCopyOrderId, actualOrderId}) {

    const copyItemsToAnotherOrder = (sourceOrderId, targetOrderId) => {
        const payload = {
            source_order_id: toCopyOrderId,
            target_order_id: actualOrderId
        };
    
        axiosClient
            .post("/copyitems", payload)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return(
        <div>
            <Text>CopyGroceries from order: {toCopyOrderId}</Text>
            <Text>actualOrderId from order: {actualOrderId}</Text>

            <Button onClick={copyItemsToAnotherOrder}>Copy</Button>
            
        </div>
    )
}

export default CopyGroceries;