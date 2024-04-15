import React, { useEffect } from "react";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
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

  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

  
import Header from "../../Header";
import axiosClient from "../../../axios-client";



function AllUsers() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const fetchUsers = () => {
        axiosClient
            .get("/users")
            .then((response) => {
                const usersData = response.data.map(user => {
                    const date = new Date(user.created_at);
                    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                    user.created_at = date.toLocaleString('de-DE', options).replace(/\./g, '-');
                    return user;
                });
                setUsers(usersData);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editUserOpenModal = (user) => {
        setSelectedUser(user);
        onOpen();
    }


    useEffect(() => {
        fetchUsers();
    }, []);

///////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Header title="User Managment" />

            <TableContainer>
              <Table variant='striped' colorScheme='teal'>
                <TableCaption>All registered users</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id:</Th>
                    <Th>Name:</Th>
                    <Th>Email:</Th>
                    <Th>Create Date:</Th>
                    <Th>Actions:</Th>
                  </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tr key={user.id}>
                            <Td>{user.id}</Td>
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.created_at}</Td>
                            <Td>
                                <Button onClick={() => editUserOpenModal(user)} colorScheme="blue" mr={3}>Edit</Button>
                                <Button colorScheme="red">Delete</Button>
                            </Td>
                        </Tr>
                    ))}

                </Tbody>
              </Table>
            </TableContainer>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Edit: {selectedUser === null ? (
                            "Loading user ..."
                        ) : (
                            selectedUser.name
                        )}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedUser === null ? (
                            "Loading user ..."
                        ) : (
                            <div>
                                <div style={{marginBottom: '20px'}}>
                                    <label><b>Full Name:</b></label>
                                    <Input
                                        placeholder="Full Name"
                                        type="text"
                                        defaultValue={selectedUser.name}
                                    />
                                </div>
                                <div style={{marginBottom: '20px'}}>
                                    <label><b>E-mail:</b></label>
                                    <Input
                                        placeholder="Email address"
                                        type="email"
                                        defaultValue={selectedUser.email}
                                    />
                                </div>
                                <div style={{marginBottom: '20px'}}>
                                    <label><b>New Password:</b></label>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        defaultValue={selectedUser.password}
                                    />
                                </div>
                                <div style={{marginBottom: '20px'}}>
                                    <label><b>Confirm New Password:</b></label>
                                    <Input
                                        placeholder="Confirm Password"
                                        type="password"
                                        defaultValue={selectedUser.confirmPassword}
                                    />
                                </div>
                            </div>
                        )}
                    </ModalBody>    
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    <Button colorScheme="green">Save</Button>
                  </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
}

export default AllUsers;