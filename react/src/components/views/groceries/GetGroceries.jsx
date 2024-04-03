import React from "react";
import axiosClient from "../../../axios-client";

import { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";

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

    useEffect(() => {
        fetchGroceries();
    }, []);

    return (
        <div style={{ marginTop: "70px" }}>
            <Flex flexWrap="wrap" justifyContent="space-between">
                {groceries.map((grocery) => (
                    <Box key={grocery.id} width="300px" mb={4}>
                        <Card>
                            <CardHeader>
                                <Heading size="md">{grocery.name}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>{grocery.unit}</Text>
                                <Text>{grocery.category}</Text>
                                <Text>{grocery.supplier}</Text>
                            </CardBody>
                            <CardFooter>
                                <Button colorScheme="red">Delete</Button>
                            </CardFooter>
                        </Card>
                    </Box>
                ))}
            </Flex>
        </div>
    );
}

export default GetGroceries;
