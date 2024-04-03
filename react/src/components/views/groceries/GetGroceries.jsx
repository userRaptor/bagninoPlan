import React from "react";
import axiosClient from "../../../axios-client";

import { useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
} from "@chakra-ui/react";
import { Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
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

function GetGroceries() {
    const [groceries, setGroceries] = React.useState([]);

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

    const deleteGroceries = (grocery) => {
        console.log("DELETE ID: " + grocery.id);
        axiosClient
            .delete(`/groceries/${grocery.id}`)
            .then((response) => {
                if (response.status === 204) {
                    console.log("Löschen erfolgreich");
                    fetchGroceries();
                } else {
                    console.log(
                        "Fehler beim Löschen:",
                        response.status,
                        response.data
                    );
                }
            })
            .catch((error) => {
                console.log("Fehler:", error);
                if (error.response) {
                    console.log("Serverantwort:", error.response);
                }
            });
    };

    const deleteAll = () => {
        axiosClient
            .delete("/groceries")
            .then((response) => {
                if (response.status === 204) {
                    console.log("Löschen erfolgreich");
                    fetchGroceries();
                } else {
                    console.log(
                        "Fehler beim Löschen:",
                        response.status,
                        response.data
                    );
                }
            })
            .catch((error) => {
                console.log("Fehler:", error);
                if (error.response) {
                    console.log("Serverantwort:", error.response);
                }
            });
    }

    useEffect(() => {
        fetchGroceries();
    }, []);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Button onClick={deleteAll}>DELETE ALL</Button>
            <div style={{ marginTop: "50px", marginBottom: "50px" }}>
                <Box height="5px" backgroundColor="black" />
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
                        {groceries.map((grocery) => (
                            <Tr key={grocery.id}>
                                <Td>{grocery.id}</Td>
                                <Td>{grocery.name}</Td>
                                <Td>{grocery.unit}</Td>
                                <Td>{grocery.category}</Td>
                                <Td>{grocery.supplier}</Td>
                                <Td>
                                    {/* isDisabled */}
                                    <Button
                                        colorScheme="red"
                                        onClick={() => deleteGroceries(grocery)}
                                    >
                                        Delete
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

export default GetGroceries;
