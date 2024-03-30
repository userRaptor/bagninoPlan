import { Input, Text } from "@chakra-ui/react";
import React from "react";
import Calendar from "react-calendar";
import { useState } from "react";

import "react-calendar/dist/Calendar.css";

function NeueBestellungen() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("");
    const [schoolClass, setSchoolClass] = React.useState("");
    const [location, setLocation] = React.useState("");

    

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = formatDate(date);
        setDate(formattedDate);
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

    const formattedDate = formatDate(selectedDate);
    const dayOfWeek = getDayOfWeek(selectedDate);

    return (
        <div>
            <Text mb="8px">
                Value: {formattedDate} ({dayOfWeek})
            </Text>
            <Input
                value={formattedDate}
                placeholder="Hier ist ein Beispiel-Platzhalter"
                size="sm"
                width="200px"
            />

            <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
    );
}

export default NeueBestellungen;
