import React, { useEffect } from "react";
import { Button, Text } from "@chakra-ui/react";
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
  } from '@chakra-ui/react'




function NewUser() {

    useEffect(() => {

    }, []);

///////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div style={{marginTop: "50px", marginBottom: "50px"}}>
            <Text>Create new user:</Text>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Firstname:</Th>
                    <Th>Secondname:</Th>
                    <Th>EMail:</Th>
                    <Th>Role:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                        <Input placeholder='Basic usage' style={{borderColor: 'grey', borderWidth: 1}} />
                    </Td>
                    <Td>
                        <Input placeholder='Basic usage' style={{borderColor: 'grey', borderWidth: 1}} />
                    </Td>
                    <Td>
                        <Input placeholder='Basic usage' style={{borderColor: 'grey', borderWidth: 1}} />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Password:</Th>
                    <Th>Confirm Password:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                        <Input placeholder='Basic usage' style={{borderColor: 'grey', borderWidth: 1}} />
                    </Td>
                    <Td>
                        <Input placeholder='Basic usage' style={{borderColor: 'grey', borderWidth: 1}} />
                    </Td>
                    <Td>
                        <Button colorScheme="blue">ADD User</Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            {/**Trennlinie */}
            <div style={{ marginTop: "50px", marginBottom: "70px", borderTop: "5px solid green", h: "100%" }} />{" "}
            

        </div>
    );
}

export default NewUser;