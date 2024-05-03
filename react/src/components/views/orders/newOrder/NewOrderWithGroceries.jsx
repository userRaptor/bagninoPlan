import React from "react";

import Header from "../../../Header";
import NewOrder from "./NewOrder";
import AvailableGroceries from "./AvailableGroceries";
import GroceriesOrders from "./GroceriesOrders";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

function NewOrderWithGroceries() {
    const [orderAlreadyExists, setOrderAlreadyExists] = React.useState(false);
    const [actualOrderId, setActualOrderId] = React.useState("");
    const [booleanUpdateGroceriesOrder, setBooleanUpdateGroceriesOrder] =
        React.useState(false);

    const handleOrderAlreadyExists = () => {
        setOrderAlreadyExists(true);
    };

    const handleActualOrderId = (actualOrderIdFromChild) => {
        setActualOrderId(actualOrderIdFromChild);
    };

    const updateGroceriesOrder = () => {
        setBooleanUpdateGroceriesOrder(!booleanUpdateGroceriesOrder);
    };

    return (
        <div>
            <Header title="New Order" />
            <NewOrder
                setOrderAlreadyExistsToParent={handleOrderAlreadyExists}
                setActualOrderIdToParent={handleActualOrderId}
            />

            {orderAlreadyExists ? (
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <AvailableGroceries
                        orderId={actualOrderId}
                        setBooleanUpdateGroceriesOrder={updateGroceriesOrder}
                    />

                    {/**Trennlinie Senkrecht*/}
                    <div style={{ borderLeft: "5px solid green", h: "100%" }} />{" "}
                    
                    <GroceriesOrders
                        orderId={actualOrderId}
                        booleanUpdateGroceriesOrder={
                            booleanUpdateGroceriesOrder
                        }
                    />
                </div>
            ) : (
                <Box padding="6" boxShadow="lg" bg="white">
                    <SkeletonCircle size="10" />
                    <SkeletonText
                        mt="4"
                        noOfLines={4}
                        spacing="4"
                        skeletonHeight="2"
                    />
                </Box>
            )}
        </div>
    );
}

export default NewOrderWithGroceries;
