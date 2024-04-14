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
import axiosClient from "../../../axios-client";

function NewOrder({ setOrderAlreadyExistsToParent, setActualOrderIdToParent }) {
    const [date, setDate] = React.useState("");
    const [internationalDate, setInternationalDate] = React.useState("");
    const [weekday, setWeekday] = React.useState("");
    const [time, setTime] = React.useState("");
    const [schoolClass, setSchoolClass] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [purpose, setPurpose] = React.useState("");

    const [orderID, setOrderID] = React.useState("");
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

        axiosClient
            .post("/orders", payload)
            .then((response) => {
                //console.log(response);
                setOrderID(response.id);

                setOrderAlreadyExists(true);
                setOrderAlreadyExistsToParent();
                setActualOrderIdToParent(response.id);
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
                                        disabled={orderAlreadyExists}
                                        onChange={handleDateTimeChange}
                                    />
                                </Td>
                                <Td>
                                    <Input
                                        placeholder="Klasse"
                                        disabled={orderAlreadyExists}
                                        onChange={(event) =>
                                            setSchoolClass(event.target.value)
                                        }
                                    />
                                </Td>
                                <Td>
                                    <Input
                                        placeholder="Ort"
                                        disabled={orderAlreadyExists}
                                        onChange={(event) =>
                                            setLocation(event.target.value)
                                        }
                                    />
                                </Td>
                                <Td>
                                    <Input
                                        placeholder="Verwendungszweck"
                                        disabled={orderAlreadyExists}
                                        onChange={(event) => setPurpose(event.target.value)}
                                    />
                                </Td>

                                <Td>
                                    {/**isDisabled={orderAlreadyExists} */}
                                    <Button 
                                        colorScheme="blue"
                                        onClick={createNewOrder}
                                        isDisabled={orderAlreadyExists}
                                    >
                                        Add groceries
                                    </Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>

            <div style={{ borderTop: '5px solid green', h: '100%' }} /> {/**Trennlinie */}
            
        </div>
    );
}

export default NewOrder;

// ADD NEW USER: (We need this that we can use the foreignKey in the orders table)
// INSERT INTO users (name, email, password, created_at, updated_at) VALUES ('Max Mustermann', 'max@example.com', 'password', NOW(), NOW());