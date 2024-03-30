import { Input, Text } from "@chakra-ui/react";
import React from "react";

function NeueBestellungen() {
    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("");
    const [schoolClass, setSchoolClass] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [purpose, setPurpose] = React.useState("");
    const [remark, setRemark] = React.useState("");
    
    const handleChange = (event) => setValue(event.target.value);

    return (
        <div>
            <Text mb="8px">Value: {value}</Text>
            <Input
                value={value}
                onChange={handleChange}
                placeholder="Here is a sample placeholder"
                size="sm"
                width="200px" // Hier die gewünschte Breite einstellen
            />
        </div>
    );
}

export default NeueBestellungen;
