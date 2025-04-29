import React from "react";
import {Routes , Route} from "react-router-dom";
import Account from "./components/Account";
import Profile from "./components/Profile";
import Details from "./components/Details";


export default function App(){

  return(

    <>
   
    <Routes>
      <Route path="/account" element={<Account/>}/>
      <Route path="/account/profile" element={<Profile/>}/>
      <Route path="/account/profile/details" element={<Details/>}/>
      <Route path="account">
          <Route path="profile" element={<Profile/>}/>
          <Route path ="details" element={<Details/>}/>

      </Route>
    </Routes>
    </>

  )

}