import React from "react";

import { useEffect } from "react";

import { Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";


import Header from "../../../Header";
import axiosClient from "../../../../axios-client";
import DetailViewOrder from "../allOrders/DetailViewOrder";

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


function MyOrders() {
    const [orders, setOrders] = React.useState([]);
    const [searchByPurpose, setSearchByPurpose] = React.useState("");

    const getOrdersById = (id) => {
        axiosClient
            .get(`/orders/${id}`)
            .then((response) => {
                setOrders(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteOrderById = (order) => {
        if (window.confirm("Delete order with ID: " + order.id)) {
            axiosClient
                .delete(`/orders/${order.id}`)
                .then((response) => {
                    getOrdersById(1);   ////////////////// CHANGE THE USER ID //////////////////
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const deleteAllOrders = () => {
        if (window.confirm("Are you sure? You can't undo this action afterwards.")) {
            axiosClient
                .delete("/orders")
                .then((response) => {
                    getOrdersById(1);   ////////////////// CHANGE THE USER ID //////////////////
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };


    const filteredOrders = orders.filter(order => order.purpose.startsWith(searchByPurpose));


    useEffect(() => {
        getOrdersById(1);   ////////////////// CHANGE THE USER ID //////////////////
    }, []);


    return (
        <div>
            <Header title="My Orders" />
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px", marginTop:"50px" }}>
                <Input
                    variant="outline"
                    placeholder="Search by purpose ..."
                    style={{ width: "30%" }}
                    onChange={(e) => setSearchByPurpose(e.target.value)}
                />
            </div>

            <TableContainer>
                <Table variant="striped" colorScheme="teal">
                    <TableCaption>My orders</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Id::</Th>
                            <Th>Info:</Th>
                            <Th>Purpose:</Th>
                            <Th>Date:</Th>
                            <Th>Class:</Th>
                            <Th>Reuse:</Th>
                            <Th>Delete:</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        
                        {filteredOrders.map((order) => (
                            <Tr key={order.id}>
                                <Td>{order.id}</Td>
                                <Td>
                                    <DetailViewOrder order={order} />
                                </Td>
                                <Td>{order.purpose}</Td>
                                <Td>{order.date}</Td>
                                <Td>{order.schoolClass}</Td>
                                <Td>
                                    <Button
                                        colorScheme="blue"
                                    >
                                        Reuse
                                    </Button>
                                </Td>
                                <Td>
                                    {/* isDisabled */}
                                    <Button 
                                        colorScheme="red"  
                                        onClick={() => deleteOrderById(order)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button colorScheme="red" onClick={deleteAllOrders}>
                    DELETE ALL
                </Button>
            </div>
            
        </div>
    );
}   

export default MyOrders;