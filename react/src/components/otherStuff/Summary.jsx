import React from 'react';
import axiosClient from '../../axios-client';
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";


function Summary (){

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
    </div>
  );
}

export default Summary;
