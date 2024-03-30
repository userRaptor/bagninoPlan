import React from "react";
import { Input, Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

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

function NewGroceries() {
    const [groceriesName, setGroceriesName] = React.useState([]);
    const [groceriesUnit, setGroceriesUnit] = React.useState("");
    const [groceriesCategory, setGroceriesCategory] = React.useState("");
    const [groceriesSupplier, setGroceriesSupplier] = React.useState([]);

    const handleChangeUnit = (event) => {
        setGroceriesUnit(event);
    };

    const handleChangeCategory = (event) => {
        setGroceriesCategory(event);
    };

    //////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div
            style={{
                marginTop: "200px",
                marginLeft: "30px",
                marginRight: "200px",
                marginBottom: "30px",
            }}
        >

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
                                    value={groceriesName}
                                    onChange={(event) => setGroceriesName(event.target.value)}
                                    placeholder="Produktname"
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
                                            : "Einheit"}
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
                                            : "Kategorie"}
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
                                    onChange={(event) => setGroceriesSupplier(event.target.value)}
                                    placeholder="Lieferant"
                                />
                            </Td>
                            <Td>
                                <Button colorScheme="blue">ADD</Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default NewGroceries;
