import React from "react";
import { Input, Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import GetGroceriesForUser from "./AvailableGroceries";

import { useState } from "react";

import "react-calendar/dist/Calendar.css";

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
import Header from "../../Header";

function NeueBestellungen() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = React.useState("");
    const [weekday, setWeekday] = React.useState("");
    const [time, setTime] = React.useState("");
    const [schoolClass, setSchoolClass] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [purpose, setPurpose] = React.useState("");

    const handleDateTimeChange = (event) => {
        const dateTimeValue = event.target.value;
        const [dateValue, timeValue] = dateTimeValue.split("T");
        const [year, month, day] = dateValue.split("-");

        const selectedDate = new Date(year, month - 1, day);
        const options = { weekday: "long" };
        const weekdayValue = selectedDate.toLocaleDateString("de-DE", options);

        // Update state with extracted values
        setDate(`${day}-${month}-${year}`);
        setWeekday(weekdayValue);
        setTime(timeValue);
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Header title="New Order" />
            <div style={{
                marginTop: "10px",
                marginLeft: "30px",
                marginRight: "200px",
                marginBottom: "30px",
            }}>

                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Datum und Uhrzeit:</Th>
                                <Th>Klasse:</Th>
                                <Th>Ort:</Th>
                                <Th>Verwendungszweck:</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <Input
                                        placeholder="Select Date and Time"
                                        size="md"
                                        type="datetime-local"
                                        onChange={handleDateTimeChange}
                                    />
                                </Td>
                                <Td>
                                    <Input
                                        placeholder="Klasse"
                                        size="md"
                                        onChange={(event) =>
                                            setSchoolClass(event.target.value)
                                        }
                                    />
                                </Td>
                                <Td>
                                    <Input
                                        placeholder="Ort"
                                        size="md"
                                        onChange={(event) =>
                                            setLocation(event.target.value)
                                        }
                                    />
                                </Td>
                                <Td>
                                    <Input
                                        placeholder="Verwendungszweck"
                                        size="md"
                                        onChange={(event) => setPurpose(event.target.value)}
                                    />
                                </Td>

                                <Td>
                                    <Button colorScheme="blue">ADD</Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>

            <GetGroceriesForUser />
        </div>
    );
}

export default NeueBestellungen;

{
    /* 
    
        <Text mb="8px">
            Value: {date} ({weekday})
        </Text>
    
    */
}
