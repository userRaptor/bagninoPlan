import React from 'react';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

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


function GroceriesOrders( {orderId, booleanUpdateGroceriesOrder} ){
    const [groceriesOrders, setGroceriesOrders] = useState([]);
    const navigate = useNavigate();

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

    const saveGroceriesOrder = () => {
        navigate('/myorders');
    };

    useEffect(() => {
        fetchGroceriesOrders();
    }  , [booleanUpdateGroceriesOrder]);

    return (
        <div>
            <Text fontSize='xl' style={{ display: 'block', textAlign: 'center', color: 'green', fontWeight: 'bold', marginTop: '30px' }}>Groceries in Order:</Text>

            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '40px', margin: '30px' }}>
                <Text fontSize='md' style={{ color: 'grey' }}>OrderID: {orderId}</Text>
                <Button colorScheme='green' onClick={saveGroceriesOrder}>SAVE ORDER</Button>
            </div>

            <TableContainer>
              <Table variant='striped' colorScheme='teal'>
                <TableCaption>Groceries included in the order</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Product Name:</Th>
                    <Th>Quantity:</Th>
                    <Th>Unit:</Th>
                    <Th>Comment:</Th>  
                    <Th>Remove:</Th>   
                  </Tr>
                </Thead>
                <Tbody>
                    {groceriesOrders.map((order) => (
                        <Tr key={order.id}>
                            {/*<Td>{order.groceries_id}</Td>*/}
                            <Td>{order.groceries.name}</Td>
                            <Td>{order.quantity}</Td>
                            <Td>{order.groceries.unit}</Td>
                            <Td>{order.comment}</Td>
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