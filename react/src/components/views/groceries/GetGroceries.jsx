import React from "react";
import axiosClient from "../../../axios-client";

import { useEffect } from "react";

import { Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
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
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

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
        if (window.confirm("Are you sure to delete this grocery? \nYou can't undo this action afterwards.")) {
            axiosClient
                .delete(`/groceries/${grocery.id}`)
                .then((response) => {
                    fetchGroceries();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const deleteAll = () => {
        if (window.confirm("Are you sure to delete all groceries? \nYou can't undo this action afterwards.")) {
            axiosClient
                .delete("/groceries")
                .then((response) => {
                    fetchGroceries();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const filteredGroceries = groceries.filter(grocery => grocery.name.startsWith(search));

    // Pagination
    const pages = [];
    for (let i = 1; i <= Math.ceil(filteredGroceries.length / itemsPerPage); i++) {
        pages.push(i);
    }

    useEffect(() => {
        fetchGroceries();
    }, []);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <div style={{ marginTop: "50px", marginBottom: "50px" }}>
                <Box height="5px" backgroundColor="green" />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
                <Input
                    variant="outline"
                    placeholder="Search ..."
                    style={{ width: "30%" }}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // Set page back to 1 when search changes (Pagination)
                    }}
                    
                />
            </div>

            <TableContainer>
                <Table variant="striped" colorScheme="teal">
                    <TableCaption></TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Id:</Th>
                            <Th>Product name:</Th>
                            <Th>Unit:</Th>
                            <Th>Category:</Th>
                            <Th>Supplier:</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredGroceries
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) // Pagination
                            .map((grocery) => (
                              <Tr key={grocery.id}>
                                <Td>{grocery.id}</Td>
                                <Td>{grocery.name}</Td>
                                <Td>{grocery.unit}</Td>
                                <Td>{grocery.category}</Td>
                                <Td>{grocery.supplier}</Td>
                                <Td>
                                  <Button colorScheme="red" onClick={() => deleteGroceriesById(grocery)}>
                                    Delete
                                  </Button>
                                </Td>
                              </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <div>
                <Text as='b' fontSize='lg' mb={"20px"} mr={"20px"}>Pagination, Select your page:</Text>
                {pages.map((number) => (
                    <Button key={number} onClick={() => setCurrentPage(number)} style={{ marginRight: '10px', marginBottom: '10px' }}>
                        {number}
                    </Button>
                ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
                {/* isDisabled */}
                <Button mt={"20px"} colorScheme="red" onClick={deleteAll}>
                    DELETE ALL
                </Button>
            </div>
        </div>
    );
}

export default GetGroceries;
