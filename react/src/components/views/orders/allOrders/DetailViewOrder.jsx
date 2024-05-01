import React from 'react';

import { Button } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'



function DetailViewOrder({ order }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <Button colorScheme='transparent' color='black'onClick={onOpen}>
                {<ArrowDownIcon />}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Included Groceries in the order: {order.purpose}!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {order.groceries ? order.groceries.map((grocery) => (
                        <div key={grocery.id}>
                            <h4>{grocery.name}</h4>
                            <p>Quantity: {grocery.pivot.quantity}</p>
                            <p>Comment: {grocery.pivot.comment}</p>
                        </div>
                    )) : <p>No groceries for this order.</p>}
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

        </div>
    );
}

export default DetailViewOrder;