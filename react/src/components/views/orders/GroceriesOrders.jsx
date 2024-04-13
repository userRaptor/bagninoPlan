import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

import axiosClient from "../../../axios-client";


function GroceriesOrders( {orderId} ){
    const [groceriesOrders, setGroceriesOrders] = useState([]);

    const fetchGroceriesOrders = () => {
        axiosClient
            .get(`/groceries_order/${orderId}`)
            .then((response) => {
                //console.log(response);
                setGroceriesOrders(response);
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
            <Text fontSize='xl'>OrderID : {orderId}</Text>
            <Button onClick={fetchGroceriesOrders}>Refresh</Button>
            <Button>Save</Button>

            <TableContainer>
              <Table variant='striped' colorScheme='teal'>
                <TableCaption>Groceries included in the order</TableCaption>
                <Thead>
                  <Tr>
                    <Th>groceries_id:</Th>
                    <Th>Comment:</Th>
                    <Th>Quantity:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                    {groceriesOrders.map((order) => (
                        <Tr key={order.id}>
                            {/*<Td>{order.order_id}</Td>*/}
                            <Td>{order.groceries_id}</Td>
                            <Td>{order.comment}</Td>
                            <Td>{order.quantity}</Td>
                            <Td>
                                <Button 
                                    colorScheme="red"
                                    isDisabled={true}
                                >
                                    <Center>
                                        <DeleteIcon />
                                    </Center>
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>

        </div>
    );
}

export default GroceriesOrders;