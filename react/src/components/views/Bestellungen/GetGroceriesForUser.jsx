import React from "react";
import axiosClient from "../../../axios-client";

import { useEffect } from "react";

import { Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
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

function GetGroceriesForUser() {
    const [groceries, setGroceries] = React.useState([]);
    const [search, setSearch] = React.useState("");

    const fetchGroceries = () => {
        axiosClient
            .get("/groceries")
            .then((response) => {
                setGroceries(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addGroceryToOrder = (grocery) => {
        console.log("addGroceryToOrder: ", grocery);
    };



    const filteredGroceries = groceries.filter(grocery => grocery.name.startsWith(search));

    useEffect(() => {
        fetchGroceries();
    }, []);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>

            <div style={{ display: "flex", flexDirection: "row", height: "5px", backgroundColor: "black", width: "100%" }}>
                <div style={{ flex: "0 1 50%", marginRight: "30px" }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px", marginTop: "30px" }}>
                        <Input
                            variant="outline"
                            placeholder="Search"
                            style={{ width: "30%" }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <TableContainer>
                        <Table variant="striped" colorScheme="teal">
                            <TableCaption>All available products</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Id:</Th>
                                    <Th>Name:</Th>
                                    <Th>Unit:</Th>
                                    <Th>Category:</Th>
                                    <Th>Supplier:</Th>
                                </Tr>
                            </Thead>
                            <Tbody>

                                {filteredGroceries.map((grocery) => (
                                    <Tr key={grocery.id}>
                                        <Td>{grocery.id}</Td>
                                        <Td>{grocery.name}</Td>
                                        <Td>{grocery.unit}</Td>
                                        <Td>{grocery.category}</Td>
                                        <Td>{grocery.supplier}</Td>
                                        <Td>
                                            {/* isDisabled */}
                                            <Button
                                                colorScheme="blue"
                                                onClick={() =>
                                                    addGroceryToOrder(grocery)
                                                }
                                            >
                                                ADD
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ flex: "1", borderLeft: "5px solid black", height: `${document.body.scrollHeight}px`  }}>
                    {/* Hier kann Inhalt der rechten Seite hinzugefügt werden ... */}
                </div>
            </div>
        </div>

    );
}

export default GetGroceriesForUser;
