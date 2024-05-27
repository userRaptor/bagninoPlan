import React from 'react';
import axiosClient from '../../axios-client';
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";


function Summary (){
  const [currentPage, setCurrentPage] = useState(1);      // Pagination
  const itemsPerPage = 20;                                // Pagination

  // Pagination
  const pages = [];
  for (let i = 1; i <= Math.ceil(filteredGroceries.length / itemsPerPage); i++) {
      pages.push(i);
  }


  // Aufruf von Alert: successAlert("Order has been deleted successfully!");

  const successAlert = (infoSuccess) => {
    toast.success(infoSuccess, {
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
  };

  const errorAlert = (infoError) => {
    toast.error(infoError, {
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
  };

  const warningAlert = (infoWarning) => {
    toast.warn(infoWarning, {
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
  };

  const deleteThingsWarning = (grocery) => {
    if (window.confirm("Are you sure to delete this grocery? \nYou can't undo this action afterwards.")) {

    }
  };


  return (
    <div>
      HELLO WORLD
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


      {/*
      {filteredGroceries
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) // Pagination
        .map((grocery) => ( ... ))}

      <Input
        value={search}
        onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);            // reset pagination
        }}
      />


      */}



      {/* Pagination */}
      <div style={{marginLeft: "20px", marginRight: "20px"}}>
          <Text fontSize='lg' mb={"20px"} mr={"20px"}>
              Page: {currentPage} of {pages.length}
          </Text>
          <Text as='b' fontSize='lg' mb={"20px"} mr={"20px"}>Pagination, Select your page:</Text>         
          {pages.map((number) => (
              <Button key={number} onClick={() => setCurrentPage(number)} style={{ marginRight: '10px', marginBottom: '10px' }}>
                  {number}
              </Button>
          ))}
      </div>
    </div>
  );
}

export default Summary;
