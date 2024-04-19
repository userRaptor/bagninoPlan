import React from "react";

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Text, Stack, Box } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const btnRef = React.useRef();

    const navigateToDashboard = () => {
        navigate("/dashboard");
    };

    const navigateToNewOrder = () => {
        navigate("/neworder");
    }

    const navigateToNewGroceries = () => {
        navigate("/newgroceries");
    }

    const navigateToUsers = () => {
        navigate("/users");
    }

    const navigateToUserManagment = () => {
        navigate("/usermanagment");
    }

    const navigateToMyOrders = () => {
        navigate("/myorders");
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <IconButton
                aria-label="Open menu"
                icon={<HamburgerIcon boxSize={30} />}
                color="black"
                variant="ghost"
                onClick={onOpen}
            />

            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                    <Stack spacing={10}>
                        <Button variant='link' fontSize='lg' onClick={navigateToDashboard}>Dashboard</Button>
                        <Button variant='link' fontSize='lg' onClick={navigateToNewOrder}>New Order</Button>
                        <Button variant='link' fontSize='lg' onClick={navigateToMyOrders}>My Orders</Button>
                        <Button variant='link' fontSize='lg'>User Settings</Button>

                        <Button variant='link' fontSize='lg' onClick={navigateToNewGroceries}>Groceries</Button>
                        <Button variant='link' fontSize='lg' onClick={navigateToUserManagment}>User Managment NEW</Button>
                        <Button variant='link' fontSize='lg' onClick={navigateToUsers}>User Managment</Button>
                    </Stack>
                </DrawerBody>
                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

export default Header;
