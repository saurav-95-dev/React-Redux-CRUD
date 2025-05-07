import React, { useEffect  , useState} from "react";
import Navbar from "./components/Navbar.jsx";
import "./index.css"
import Create from "./components/Create.jsx";


export default function App(){

    return(

        <>
         <Navbar/>
         <Create/>
        </>

    )

}