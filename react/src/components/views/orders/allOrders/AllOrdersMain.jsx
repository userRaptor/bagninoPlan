import React, { useEffect } from "react";
import Header from "../../../Header";
import axiosClient from "../../../../axios-client";
import DetailViewOrder from "./DetailViewOrder";

import { Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { ArrowDownIcon } from '@chakra-ui/icons';
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

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
                // Ladezustand mit einer Verzögerung von 500ms beenden
                setTimeout(() => {
                    setLoadingOrderId(null);
                }, 500);
            })
            .catch((error) => {
                console.log(error);
                setTimeout(() => {
                    setLoadingOrderId(null);
                }, 500);
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
                                    <DetailViewOrder order={order} />
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
                                    colorScheme={loadingOrderId === order.id ? "gray" : (order.includeSummary ? "orange" : "green")} 
                                    onClick={() => changeIncludeSummary(order)}
                                    isLoading={loadingOrderId === order.id}
                                    loadingText="Loading"
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