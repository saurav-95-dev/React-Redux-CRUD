import React, { useEffect  , useState} from "react";
import Navbar from "./components/Navbar.jsx";
import "./index.css"
import Create from "./components/Create.jsx";
import {BrowserRouter , Route , Routes} from "react-router-dom";
import Read from "./components/Read.jsx";

export default function App(){

    return(

        <>
        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route  exact path = "/" element={<Create/>}/>
            <Route  exact path = "/read" element={<Read/>}/>
        </Routes>
        </BrowserRouter>
      
         
        </>

    )

}