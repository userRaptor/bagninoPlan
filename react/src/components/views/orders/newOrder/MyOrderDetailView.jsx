import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Center } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from '@chakra-ui/react';

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
} from "@chakra-ui/react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import axiosClient from "../../../../axios-client";

function MyOrderDetailView ({ orderId, booleanUpdateGroceriesOrder }) {
    const [groceriesOrders, setGroceriesOrders] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    const navigateMyOrders = () => {
        navigate("/myorders");
    };

    const navigateNewOrder = () => {
        window.location.reload();
    };

    const deleteGroceriesOrderById = (groceriesOrder) => {
        axiosClient
            .delete(`/groceries_order/${groceriesOrder.id}`)
            .then((response) => {
                fetchGroceriesOrders();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchGroceriesOrders();
    }, [booleanUpdateGroceriesOrder]);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "40px",
                    margin: "30px",
                }}
            >
                <Text fontSize="md" style={{ color: "grey" }}>
                    OrderID: {orderId}
                </Text>

                <Button colorScheme="blue" onClick={onOpen}>
                    View OrderDetails
                </Button>

                <Button colorScheme="green" onClick={navigateNewOrder}>
                    New Order
                </Button>

                <Button colorScheme="green" onClick={navigateMyOrders}>
                    Navigate MyOrders
                </Button>

            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent maxW='80%'>
                <ModalHeader>Included Groceries in the order: {orderId}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TableContainer>
                        <Table variant="striped" colorScheme="teal">
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
                                                onClick={() => deleteGroceriesOrderById(order)}  
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

                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>


            {/**Trennlinie Waagerecht*/}
            <div style={{ borderTop: "5px solid green", h: "100%" }} />{" "}
            
        </div>
    );
}

export default MyOrderDetailView;
