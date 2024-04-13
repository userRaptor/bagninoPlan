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

function GetGroceries() {
    const [groceries, setGroceries] = React.useState([]);
    const [search, setSearch] = React.useState("");

    const fetchGroceries = () => {
        axiosClient
            .get("/groceries")
            .then((response) => {
                //console.log(response.data);
                setGroceries(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteGroceriesById = (grocery) => {
        axiosClient
            .delete(`/groceries/${grocery.id}`)
            .then((response) => {
                fetchGroceries();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteAll = () => {
        axiosClient
            .delete("/groceries")
            .then((response) => {
                fetchGroceries();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const filteredGroceries = groceries.filter(grocery => grocery.name.startsWith(search));

    useEffect(() => {
        fetchGroceries();
    }, []);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <div style={{ marginTop: "50px", marginBottom: "50px" }}>
                <Box height="5px" backgroundColor="black" />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
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
                                        colorScheme="red"
                                        onClick={() =>
                                            deleteGroceriesById(grocery)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button isDisabled colorScheme="red" onClick={deleteAll}>
                    DELETE ALL
                </Button>
            </div>
        </div>
    );
}

export default GetGroceries;
