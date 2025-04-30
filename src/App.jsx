import React from "react";
import {Routes , Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Edit from "./components/Edit";

export default function App(){

  return(

    <>
    <div className="main-container">
    <h1>Meme Generator</h1>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/edit" element={<Edit/>}/>
    </Routes>
    </div>
      
    </>

  )

}