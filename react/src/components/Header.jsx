import React from 'react';
import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'


import NavBar from './NavBar';


function Header ({ title }) {
    return (
        <div style={{backgroundColor: 'orange'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '30px' }}>
                <NavBar />
                <Text fontSize='3xl'>{title}</Text>
                <Box>
                    <Menu>
                      <MenuButton style={{backgroundColor: 'orange'}} as={Button} rightIcon={<ChevronDownIcon />}>
                        UserName
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Logout</MenuItem>
                        <MenuDivider />
                        <MenuItem>UserSettings</MenuItem>
                      </MenuList>
                    </Menu>
                </Box>

            </div>
        </div>
    );
}

export default Header;