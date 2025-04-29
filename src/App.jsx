import React from "react";
import {Routes , Route} from "react-router-dom";

import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";


export default function App(){

  return(

    <>
     <Routes>
      
        <Route path="/" element={<Home/>}/>
        <Route path="/post/:postId" element={<Profile/>}/>
     </Routes>
    </>

  )

}