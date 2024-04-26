import React, { useEffect } from "react";
import Header from "../../../Header";
import axiosClient from "../../../../axios-client";

import { Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
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


function AllOrdersMain() {
    const [orders, setOrders] = React.useState([]);

    const fetchOrders = () => {
        axiosClient
            .get("/orders")
            .then((response) => {
                console.log(response);
                setOrders(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeIncludeSummary = (order) => {
        axiosClient
            .put(`/orders/${order.id}`, { includeSummary: !order.includeSummary })
            .then((response) => {
                console.log(response);
                fetchOrders();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    

    useEffect(() => {
        fetchOrders();
    }, []);


    return (  
        <div>
            <Header title="All Orders" />


            <TableContainer>
                <Table variant="striped" colorScheme="teal">
                    <TableCaption>All orders</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Id:</Th>
                            <Th>Date:</Th>
                            <Th>Weekday:</Th>
                            <Th>Time:</Th>
                            <Th>Class:</Th>
                            <Th>Location:</Th>
                            <Th>Teacher:</Th>
                            <Th>Purpose:</Th>
                            <Th>Include Summary:</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map((order) => (
                            <Tr key={order.id}>
                                <Td>{order.id}</Td>
                                <Td>{order.date}</Td>
                                <Td>{order.weekday}</Td>
                                <Td>{order.time}</Td>
                                <Td>{order.schoolClass}</Td>
                                <Td>{order.location}</Td>
                                <Td>{order.user_id}</Td>
                                <Td>{order.purpose}</Td>
                                <Td>
                                    <Button 
                                        colorScheme={order.includeSummary ? "orange" : "green"} 
                                        onClick={() => changeIncludeSummary(order)}
                                    >
                                        {order.includeSummary ? "Exclude" : "Include"}
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

export default AllOrdersMain;