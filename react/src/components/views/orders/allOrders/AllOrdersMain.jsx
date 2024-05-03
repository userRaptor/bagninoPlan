import React, { useEffect } from "react";
import Header from "../../../Header";
import axiosClient from "../../../../axios-client";
import DetailViewOrder from "./DetailViewOrder";

import { Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { ArrowDownIcon, DownloadIcon } from '@chakra-ui/icons';
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


function AllOrdersMain() {
    const [orders, setOrders] = React.useState([]);
    const [loadingOrderId, setLoadingOrderId] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const updateStartDate = (e) => {
        console.log(e.target.value);
        setStartDate(e.target.value);
    };

    const updateEndDate = (e) => {
        console.log(e.target.value);
        setEndDate(e.target.value);
    };
    

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

    const filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
    
    
    

    useEffect(() => {
        fetchOrders();
    }, []);

    /*
    useEffect(() => {
        if (startDate && endDate) {
          const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
          });
          setOrders(filteredOrders);
        }
    }, [startDate, endDate]);
    */

//////////////////////////////////////////////////////////////////////////////////////////
    return (  
        <div>
            <Header title="All Orders" />

            <div style={{margin: '20px'}}>
                <Text fontSize='lg' fontWeight='bold'>Please select period:</Text>

                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '40px', marginTop: '20px', marginBottom: '40px'}}>
                    <Text fontWeight='bold' style={{marginRight: '10px'}}>from:</Text>
                    <Input placeholder='Select Date and Time' size='md' type='date' style={{ width: '200px'}} onChange={(e) => updateStartDate(e)}/>
                    <Text fontWeight='bold' style={{ marginLeft: '40px', marginRight: '10px' }}>to:</Text>
                    <Input placeholder='Select Date and Time' size='md' type='date' style={{ width: '200px'}} onChange={(e) => updateEndDate(e)}/>
                    <Button colorScheme="green" style={{marginLeft: '40px'}}>
                        Export <DownloadIcon style={{marginLeft: '10px'}}/>
                    </Button>

                </div>

            </div>
            
            {/**Trennlinie waagerecht*/}
            <div style={{ borderTop: "5px solid green", h: "100%", marginBottom: '40px' }} />{" "}  


            <TableContainer>
                <Table variant="striped" colorScheme="teal">
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
                        {/** {orders.map((order) => ( */}
                        {filteredOrders.map((order) => (
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
                                    colorScheme={loadingOrderId === order.id ? "gray" : (order.includeSummary ? "green" : "orange")} 
                                    onClick={() => changeIncludeSummary(order)}
                                    isLoading={loadingOrderId === order.id}
                                    loadingText=""
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