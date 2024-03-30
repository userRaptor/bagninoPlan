import React from "react";
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
import { Input, Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

function NewGroceries() {
    const [value, setValue] = React.useState("");

    const handleChange = (event) => setValue(event.target.value);
    return (
        <div>
            <Text mb="8px">Value: {value}</Text>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Produktname:</Th>
                            <Th>Einheit:</Th>
                            <Th>Kategorie:</Th>
                            <Th>Lieferant:</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>
                                <Input
                                    value={value}
                                    onChange={handleChange}
                                    placeholder="Produktname"
                                />
                            </Td>
                            <Td>
                                <Input
                                    value={value}
                                    onChange={handleChange}
                                    placeholder="Einheit"
                                />
                            </Td>
                            <Td>
                                <Input
                                    value={value}
                                    onChange={handleChange}
                                    placeholder="Kategorie"
                                />
                            </Td>
                            <Td>
                                <Input
                                    value={value}
                                    onChange={handleChange}
                                    placeholder="Lieferant"
                                />
                            </Td>
                            <Td>
                                <Button colorScheme="blue">Button</Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default NewGroceries;
