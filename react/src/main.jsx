import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import router from "./router.jsx";

import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProvider.jsx";
import { ChakraProvider } from "@chakra-ui/react"; 

ReactDOM.createRoot(document.getElementById("root")).render(

    //<React.StrictMode> // Hilfswerkzeug für die Entwicklung, das potenzielle Probleme in Anwendungen aufdeckt.
        <ChakraProvider>
            <ContextProvider>
                {/* <RouterProvider router={router} /> */}

                <App />

            </ContextProvider>
        </ChakraProvider>
    //</React.StrictMode>
);
