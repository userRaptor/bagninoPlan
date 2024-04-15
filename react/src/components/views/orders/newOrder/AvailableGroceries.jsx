import React from "react";
import axiosClient from "../../../../axios-client";

import { useEffect } from "react";
import { Button, Divider, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { toast, ToastContainer, Bounce } from "react-toastify";

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

function AvailableGroceries({ orderId, setBooleanUpdateGroceriesOrder }) {
    const [groceries, setGroceries] = React.useState([]);
    const [searchByName, setSearchByName] = React.useState("");
    const [searchByCategory, setSearchByCategory] = React.useState("");
    const [quantity, setQuantity] = React.useState(0);
    const [comment, setComment] = React.useState("");

    const fetchGroceries = () => {
        axiosClient
            .get("/groceries")
            .then((response) => {
                setGroceries(response.data);
                //console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addGroceryToOrder = (groceries) => {
        const payload = {
            order_id: orderId,
            groceries_id: groceries.id,
            comment: comment[groceries.id],
            quantity: quantity[groceries.id],
        };

        if(comment === "" || comment === null){
            quantityIsMissingAlert();
        } else {
            axiosClient
            .post("/groceries_order", payload)
            .then((response) => {
                //console.log(response);
                setBooleanUpdateGroceriesOrder();
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    const filteredGroceries = groceries.filter(
        (grocery) =>
            grocery.name.startsWith(searchByName) &&
            grocery.category.startsWith(searchByCategory)
    );

    const quantityIsMissingAlert = () => {
        toast.error('Quantity field cannot be empty!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    };

    useEffect(() => {
        fetchGroceries();
    }, []);
    ///////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />

            <Text
                fontSize="xl"
                style={{
                    display: "block",
                    textAlign: "center",
                    color: "green",
                    fontWeight: "bold",
                    marginTop: "30px",
                }}
            >
                Available Groceries:
            </Text>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "30px",
                    marginTop: "30px",
                }}
            >
                <div style={{ width: "40%", marginRight: "20px" }}>
                    <Text>Search by name ...</Text>
                    <Input
                        variant="outline"
                        placeholder="Search ..."
                        value={searchByName}
                        onChange={(e) => setSearchByName(e.target.value)}
                    />
                </div>
                <div style={{ width: "40%" }}>
                    <Text>Search by category ...</Text>
                    <Input
                        variant="outline"
                        placeholder="Search ..."
                        value={searchByCategory}
                        onChange={(e) => setSearchByCategory(e.target.value)}
                    />
                </div>
            </div>
            <TableContainer>
                <Table variant="striped" colorScheme="teal">
                    <TableCaption>All available products</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Product Name:</Th>
                            <Th>Quantity:</Th>
                            <Th>Unit:</Th>
                            <Th>Category:</Th>
                            <Th>Comment:</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredGroceries.map((grocery) => (
                            <Tr key={grocery.id}>
                                <Td>{grocery.name}</Td>
                                <Td>
                                    <Input
                                        style={{ border: "1px solid grey" }}
                                        placeholder="..."
                                        type="number"
                                        width="60px"
                                        onChange={(e) =>
                                            setQuantity({
                                                ...quantity,
                                                [grocery.id]: e.target.value,
                                            })
                                        }
                                    />
                                </Td>
                                <Td>{grocery.unit}</Td>
                                <Td>{grocery.category}</Td>
                                <Td>
                                    <Input
                                        style={{ border: "1px solid grey" }}
                                        placeholder="Optional comment ... "
                                        onChange={(e) =>
                                            setComment({
                                                ...comment,
                                                [grocery.id]: e.target.value,
                                            })
                                        }
                                    />
                                </Td>
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
    );
}

export default AvailableGroceries;
