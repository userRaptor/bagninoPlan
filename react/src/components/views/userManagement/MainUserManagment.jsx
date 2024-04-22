import React from 'react';

import Header from "../../Header";
import NewUser from './NewUser';
import AllUsers from './AllUsers';


function MainUserManagment() {
    return (
        <div>
            
            <Header title="User Managment" />
            <NewUser />
            <AllUsers />
            
        

        </div>
    );
}

export default MainUserManagment;