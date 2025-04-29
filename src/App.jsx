import React from "react";
import {Routes , Route} from "react-router-dom";

import Home from "./components/Home.jsx";


export default function App(){

  return(

    <>
   
    <Routes>
       <Route path="/user/:userId" element={<Home/>}/>
    </Routes>
    </>

  )

}