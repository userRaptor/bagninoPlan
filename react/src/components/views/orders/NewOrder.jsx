import React, { useEffect } from "react";
import { Input, Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import { Divider } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { Box } from "@chakra-ui/react";

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

import "react-calendar/dist/Calendar.css";
import Header from "../../Header";
import AvailableGroceries from "./AvailableGroceries";
import GroceriesInBuffer from "./GroceriesInBuffer";
import axiosClient from "../../../axios-client";

function NewOrder() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = React.useState("");
    const [internationalDate, setInternationalDate] = React.useState("");
    const [weekday, setWeekday] = React.useState("");
    const [time, setTime] = React.useState("");
    const [schoolClass, setSchoolClass] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [purpose, setPurpose] = React.useState("");

    const [orderAlreadyExists, setOrderAlreadyExists] = React.useState(false);

    const handleDateTimeChange = (event) => {
        const dateTimeValue = event.target.value;
        const [dateValue, timeValue] = dateTimeValue.split("T");

        setInternationalDate(dateValue);

        // console.log("dateValue" + dateValue);
        // console.log("timeValue" + timeValue);

        const [year, month, day] = dateValue.split("-");

        const selectedDate = new Date(year, month - 1, day);
        const options = { weekday: "long" };
        const weekdayValue = selectedDate.toLocaleDateString("de-DE", options);

        // Update state with extracted values
        setDate(`${day}-${month}-${year}`);
        setWeekday(weekdayValue);
        setTime(timeValue);
    };

    const createNewOrder = (event) => {
        setOrderAlreadyExists(orderAlreadyExists => !orderAlreadyExists);

        event.preventDefault();


        const payload = {
            user_id: 1,
            date: internationalDate,
            weekday: weekday,
            time: time,
            schoolClass: schoolClass,
            location: location,
            purpose: purpose,
            includeSummary: true,
        };

        console.log(payload);

        axiosClient
            .post("/orders", payload)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
            
        
    }

    useEffect(() => {

    }, []);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Header title="New Order" />
            <div style={{
                marginTop: "10px",
                marginLeft: "30px",
                marginRight: "10px",
                marginBottom: "30px",
            }}>

                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Date and Time:</Th>
                                <Th>Class:</Th>
                                <Th>Location:</Th>
                                <Th>Purpose:</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <Input
                                        placeholder="Select Date and Time"
                                        type="datetime-local"
                                        onChange={handleDateTimeChange}
                                    />
                                </Td>
                                <Td>
                                    <Input
                                        placeholder="Klasse"
                                        onChange={(event) =>
                                            setSchoolClass(event.target.value)
                                        }
                                    />
                                </Td>
                                <Td>
                                    <Input
                                        placeholder="Ort"
                                        onChange={(event) =>
                                            setLocation(event.target.value)
                                        }
                                    />
                                </Td>
                                <Td>
                                    <Input
                                        placeholder="Verwendungszweck"
                                        onChange={(event) => setPurpose(event.target.value)}
                                    />
                                </Td>

                                <Td>
                                    <Button 
                                        colorScheme="blue"
                                        onClick={createNewOrder}
                                    >
                                        Add gloceries
                                    </Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
            
            <Divider style={{borderTop: "5px solid", borderColor: "black"}} />
            
            {orderAlreadyExists ? (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <AvailableGroceries />
                    <GroceriesInBuffer />
                </div>
            ) : (
                <Box padding='6' boxShadow='lg' bg='white'>
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                </Box>
            )}

            
        </div>
    );
}

export default NewOrder;