import React from 'react';

import Header from '../../Header';
import NewOrder from './NewOrder';
import AvailableGroceries from './AvailableGroceries';
import GroceriesOrders from './GroceriesOrders';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';


function NewOrderWithGroceries() {
    const [orderAlreadyExists, setOrderAlreadyExists] = React.useState(false);
    const [actualOrderId, setActualOrderId] = React.useState("");

    const handleOrderAlreadyExists = () => {
        setOrderAlreadyExists(true);
    };

    const handleActualOrderId = (actualOrderIdFromChild) => {
        setActualOrderId(actualOrderIdFromChild);
    }

    return (
        <div>
            <Header title="New Order" />
            <NewOrder 
                setOrderAlreadyExistsToParent={handleOrderAlreadyExists} 
                setActualOrderIdToParent={handleActualOrderId}
            />

            {orderAlreadyExists ? (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <AvailableGroceries actualOrderIdM={actualOrderId}/>
                    <GroceriesOrders orderId={actualOrderId}/>
                </div>
            ) : (
                <Box padding='6' boxShadow='lg' bg='white'>
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                </Box>
            )}

        </div>
    );
}

export default NewOrderWithGroceries;