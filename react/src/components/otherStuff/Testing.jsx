import React, { useState } from 'react';
import { Input } from "@chakra-ui/react";


function Testing (){

    const [selectedDate, setSelectedDate] = useState("");

  const handleDateTimeChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Aktuelles Datum und Uhrzeit erhalten
  const currentDate = new Date().toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM

  return (
    <Input
      placeholder="Select Date and Time"
      size="md"
      type="datetime-local"
      min={currentDate} // Setze das Minimum-Datum auf das aktuelle Datum
      value={selectedDate}
      onChange={handleDateTimeChange}
    />
  );
}

export default Testing;