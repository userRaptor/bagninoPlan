import React from 'react';

import { Text } from "@chakra-ui/react";

function CopyGroceries({toCopyOrderId}) {

    return(
        <div>
            <Text>CopyGroceries from order: {toCopyOrderId}</Text>
            
        </div>
    )
}

export default CopyGroceries;