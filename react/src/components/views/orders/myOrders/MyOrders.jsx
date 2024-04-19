import React from "react";

import { useEffect } from "react";

import { Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

import Header from "../../../Header";
import axiosClient from "../../../../axios-client";

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
    const [orders, setOrders] = React.useState([{}]);
    const [search, setSearch] = React.useState("");
    const [searchByPurpose, setSearchByPurpose] = React.useState("");

    const getOrdersById = (id) => {
        axiosClient
            .get(`/orders/${id}`)
            .then((response) => {
                console.log(response.data);
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const filteredOrders = orders.filter(order => order.purpose.startsWith(searchByPurpose));

    useEffect(() => {
        getOrdersById();
    }, []);


    return (
        <div>
            <Header title="My Orders" />
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px", marginTop:"50px" }}>
                <Input
                    variant="outline"
                    placeholder="Search by purpose ..."
                    style={{ width: "30%" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <TableContainer>
                <Table variant="striped" colorScheme="teal">
                    <TableCaption>All orders</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Order Id:</Th>
                            <Th>Purpose:</Th>
                            <Th>Date:</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        
                        {filteredOrders.map((order) => (
                            <Tr key={order.id}>
                                <Td>{order.id}</Td>
                                <Td>{order.purpose}</Td>
                                <Td>{order.date}</Td>
                                <Td>
                                    {/* isDisabled */}
                                    <Button
                                        colorScheme="red"
                                        isDisabled
                                    >
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button isDisabled colorScheme="red" >
                    DELETE ALL
                </Button>
            </div>
        </div>
    );
}   

export default MyOrders;