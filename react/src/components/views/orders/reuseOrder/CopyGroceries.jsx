import React, { useEffect, useState } from 'react';

import { Button, Text } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";



import axiosClient from '../../../../axios-client';

function CopyGroceries({toCopyOrderId, actualOrderId}) {

    const copyItemsToAnotherOrder = () => {

        const payload = {
            from_order_id: toCopyOrderId,
            to_order_id: actualOrderId
        };

        axiosClient
            .post("/copyitems", payload)
            .then((response) => {
                //console.log(response);   
                successAlert("Items copied successfully!");
            })
            .catch((error) => {
                console.log(error);
                errorAlert("Error while copying items!");
            });
    };

    const successAlert = (infoSuccess) => {
        toast.success(infoSuccess, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
      };
    
      const errorAlert = (infoError) => {
        toast.error(infoError, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
      };


    useEffect(() => {
        copyItemsToAnotherOrder();
    }, []);


    return(
        <div style={{marginTop: '10px', marginLeft: '20px', marginBottom: '20px'}}>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />           
            
        </div>

        
    )
}

export default CopyGroceries;