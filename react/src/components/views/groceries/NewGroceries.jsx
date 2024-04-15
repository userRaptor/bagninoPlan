import React, { useEffect } from "react";
import { Input, Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";

import GetGroceries from "./GetGroceries";
import Header from "../../Header";

import { ToastContainer, toast } from "react-toastify";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import "react-toastify/dist/ReactToastify.css";

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

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from "@chakra-ui/react";

import axiosClient from "../../../axios-client";
import { Bounce } from "react-toastify";

function NewGroceries() {
    const [groceriesName, setGroceriesName] = React.useState([]);
    const [groceriesUnit, setGroceriesUnit] = React.useState("");
    const [groceriesCategory, setGroceriesCategory] = React.useState("");
    const [groceriesSupplier, setGroceriesSupplier] = React.useState([]);

    const [renderKey, setRenderKey] = useState(0);

    const handleChangeUnit = (event) => {
        setGroceriesUnit(event);
    };

    const handleChangeCategory = (event) => {
        setGroceriesCategory(event);
    };

    const saveGroceries = () => {
        groceriesAddedSuccessfullyAlert();
        const payload = {
            name: groceriesName,
            unit: groceriesUnit,
            category: groceriesCategory,
            supplier: groceriesSupplier,
        };

        console.log(payload);

        axiosClient
            .post("/groceries", payload)
            .then((response) => {
                console.log(response.data);
                setRenderKey((prevKey) => prevKey + 1); // to rerender the GetGroceries component
                successfullAlert();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const groceriesAddedSuccessfullyAlert = () => {
        toast.success("The product was successfully added!", {
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

    useEffect(() => {}, []);

    //////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Header title="New Groceries" />
            <div
                style={{
                    marginTop: "30px",
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginBottom: "30px",
                }}
            >
                <Text
                    style={{
                        marginTop: "50px",
                        marginLeft: "70px",
                        marginBottom: "20px",
                    }}
                    fontSize="2xl"
                >
                    ADD NEW GROCERIES:
                </Text>

                <Text
                    style={{marginLeft: "70px", marginRight: '70px', marginBottom: "30px", color: 'grey'}}
                >
                    <InfoOutlineIcon /> When creating new groceries, please always include the name first. This can be followed by further details such as: Carrots small. This makes it easier to find products using the built-in search function.
                </Text>


                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Product name:</Th>
                                <Th>Unit:</Th>
                                <Th>Category:</Th>
                                <Th>Supplier:</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <Input
                                        value={groceriesName}
                                        onChange={(event) =>
                                            setGroceriesName(event.target.value)
                                        }
                                        placeholder="Name ..."
                                    />
                                </Td>
                                <Td>
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            rightIcon={<ChevronDownIcon />}
                                        >
                                            {groceriesUnit !== ""
                                                ? groceriesUnit
                                                : "Unit"}
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem
                                                onClick={() =>
                                                    handleChangeUnit("kg")
                                                }
                                            >
                                                Kilogramm
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    handleChangeUnit("g")
                                                }
                                            >
                                                Gramm
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    handleChangeUnit("Stück")
                                                }
                                            >
                                                Stück
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    handleChangeUnit("l")
                                                }
                                            >
                                                Liter
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    handleChangeUnit("ml")
                                                }
                                            >
                                                Milliliter
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                                <Td>
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            rightIcon={<ChevronDownIcon />}
                                        >
                                            {groceriesCategory !== ""
                                                ? groceriesCategory
                                                : "Category"}
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem
                                                onClick={() =>
                                                    handleChangeCategory("Obst")
                                                }
                                            >
                                                Obst
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    handleChangeCategory(
                                                        "Milchprodukte"
                                                    )
                                                }
                                            >
                                                Milchprodukte
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    handleChangeCategory("Tiefkühl")
                                                }
                                            >
                                                Tiefkühl
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    handleChangeCategory("Gemüse")
                                                }
                                            >
                                                Gemüse
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    handleChangeCategory("Fleisch")
                                                }
                                            >
                                                Fleisch
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                                <Td>
                                    <Input
                                        value={groceriesSupplier}
                                        onChange={(event) =>
                                            setGroceriesSupplier(event.target.value)
                                        }
                                        placeholder="Supplier ..."
                                    />
                                </Td>
                                <Td>
                                    <Button
                                        colorScheme="blue"
                                        onClick={saveGroceries}
                                    >
                                        ADD
                                    </Button>
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
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>

                <GetGroceries key={renderKey} />
            </div>
        </div>
    );
}

export default NewGroceries;
