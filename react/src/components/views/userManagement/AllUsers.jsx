import React, { useEffect } from "react";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { ToastContainer, Bounce } from "react-toastify";
import { toast } from "react-toastify";

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

  import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
  } from '@chakra-ui/react'

  
import Header from "../../Header";
import axiosClient from "../../../axios-client";



function AllUsers() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    
    //const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const cancelRef = React.useRef()

    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

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

    const updateUser = (event) => {

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.confirmPassword,
        };

        console.log(payload);

        /*
        event.preventDefault();
        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, payload)
                .then(() => {
                    console.log("The user was updated successfully!");
                    
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        //setErrors(response.data.errors);
                    }
                });
        } 
        */
    };

    const deleteUser = (userId) => {
        axiosClient
            .delete(`/users/${userId}`)
            .then(() => {
                fetchUsers();
                userDeletedSuccessfullyAlert();
            });
    };

    const userDeletedSuccessfullyAlert = () => {
        toast.success('User deleted successfully!', {
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
    }

    const editUserOpenModal = (user) => {
        setSelectedUser(user);
        onOpenEdit();
    }

    const deleteUserOpenModal = (user) => {
        setSelectedUser(user);
        onOpenDelete();
    }

    const deleteUserCloseModal = () => {
        deleteUser(selectedUser.id);
        setSelectedUser(null);
        onCloseDelete();
    }
        

    useEffect(() => {
        fetchUsers();
    }, []);

///////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Header title="User Managment" />

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
                                <Button onClick={() => deleteUserOpenModal(user)} colorScheme="red">Delete</Button>
                            </Td>
                        </Tr>
                    ))}

                </Tbody>
              </Table>
            </TableContainer>

            {/* Edit User Modal */}
            <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
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
                                        onChange={(event) =>
                                            setUser({ ...user, name: event.target.value })
                                        }
                                    />
                                </div>
                                <div style={{marginBottom: '20px'}}>
                                    <label><b>E-mail:</b></label>
                                    <Input
                                        placeholder="Email address"
                                        type="email"
                                        defaultValue={selectedUser.email}
                                        onChange={(event) =>
                                            setUser({ ...user, email: event.target.value })
                                        }
                                    />
                                </div>
                                <div style={{marginBottom: '20px'}}>
                                    <label><b>New Password:</b></label>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        defaultValue={selectedUser.password}
                                        onChange={(event) =>
                                            setUser({
                                                ...user, password: event.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div style={{marginBottom: '20px'}}>
                                    <label><b>Confirm New Password:</b></label>
                                    <Input
                                        placeholder="Confirm Password"
                                        type="password"
                                        defaultValue={selectedUser.confirmPassword}
                                        onChange={(event) =>
                                            setUser({
                                                ...user, confirmPassword: event.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </ModalBody>    
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onCloseEdit}>
                            Close
                        </Button>
                    <Button colorScheme="green" onClick={()=>updateUser()}>Save</Button>
                  </ModalFooter>
                </ModalContent>
            </Modal>
                        
            {/* Delete User */}
            <AlertDialog
                isOpen={isOpenDelete}
                leastDestructiveRef={cancelRef}
                onClose={onCloseDelete}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        
                        {selectedUser === null ? (
                            "Loading user ..."
                        ) : (
                            "Delete user: " + selectedUser.name + " ?"
                        )}

                    </AlertDialogHeader>
                        
                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>
                        
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onCloseDelete}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={deleteUserCloseModal} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
           

        </div>
    );
}

export default AllUsers;