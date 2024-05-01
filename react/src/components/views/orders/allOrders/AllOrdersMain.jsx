import React, { useEffect } from "react";
import Header from "../../../Header";
import axiosClient from "../../../../axios-client";

import { Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { ArrowDownIcon } from '@chakra-ui/icons';
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";

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
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
  } from '@chakra-ui/react'


function AllOrdersMain() {
    const [orders, setOrders] = React.useState([]);
    const [loadingOrderId, setLoadingOrderId] = useState(null);

    const fetchOrders = () => {
        axiosClient
            .get("/orders")
            .then((response) => {
                setOrders(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeIncludeSummary = (order) => {
        setLoadingOrderId(order.id);
    
        axiosClient
            .put(`/orders/${order.id}`, { includeSummary: !order.includeSummary })
            .then((response) => {
                fetchOrders();
                setLoadingOrderId(null);
            })
            .catch((error) => {
                console.log(error);
                setLoadingOrderId(null);
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
                            <Th>Info:</Th>
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
                                <Td>
                                    <Popover>
                                      <PopoverTrigger>
                                        <Button >{<ArrowDownIcon />}</Button>
                                      </PopoverTrigger>
                                      <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>Confirmation!</PopoverHeader>
                                        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
                                      </PopoverContent>
                                    </Popover>
                                </Td>
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
                                    isLoading={loadingOrderId === order.id}
                                    loadingText="Lädt..."
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