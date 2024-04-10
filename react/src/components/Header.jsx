import React from 'react';
import { Text } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

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

import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

import NavBar from './NavBar';



export default function() {
    return (
        <div style={{backgroundColor: 'green'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '30px' }}>
                <NavBar />
                <Text fontSize='3xl'>Dashboard</Text>
                <Box>
                    <Menu>
                      <MenuButton style={{backgroundColor: 'green'}} as={Button} rightIcon={<ChevronDownIcon />}>
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

/*
<Select placeholder='Name' style={{width: '100px'}}>
                      <option value='option1'>Logout</option>
                      <option value='option2'>UserSettings</option>
                    </Select>
*/