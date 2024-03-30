import React from "react";
import { Input, Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Calendar from "react-calendar";
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
            <Text mb="8px">
                Value: {date} ({weekday})
            </Text>
            <Text mb="8px">
                KLasse: {schoolClass} Ort: {location} Zeit: {time}
            </Text>
            <Input
                placeholder="Hier ist ein Beispiel-Platzhalter"
                size="sm"
                width="200px"
            />

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
                                    onChange={handleDateTimeChange} // Call the function when input changes
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
    );
}

export default NeueBestellungen;

{
    /* 
                            <Td>
                                <Calendar
                                    onChange={handleDateChange}
                                    value={selectedDate}
                                />
                            </Td>


  const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = formatDate(date);
        setDate(formattedDate);
        const extractedWeekday = getDayOfWeek(date);
        setWeekday(extractedWeekday);
    };

    // Funktion zur Formatierung des Datums in "DD-MM-YYYY"
    const formatDate = (date) => {
        const formatted = `${date.getDate()}-${
            date.getMonth() + 1
        }-${date.getFullYear()}`;
        return formatted;
    };

    // Funktion zur Extrahierung des Wochentags
    const getDayOfWeek = (date) => {
        const days = [
            "Sonntag",
            "Montag",
            "Dienstag",
            "Mittwoch",
            "Donnerstag",
            "Freitag",
            "Samstag",
        ];
        const dayIndex = date.getDay();
        return days[dayIndex];
    };






                            */
}
