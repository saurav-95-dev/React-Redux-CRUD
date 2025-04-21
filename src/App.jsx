<<<<<<< HEAD
// --> Covered : Immutable States(Completed)
// --> useEffect all 3 normal variations and 3 clean-up variations
// --> Data fetch from an API in React

import React, { useState, useEffect } from "react";
import MyComponent from "./components/MyComponent";

=======
//useEffect 3 variations :

import React , {useState , useEffect} from "react";
>>>>>>> 37b49c40e7dd3d0772ef8367701c1f58f22816ec

export default function App(){
  
  const [count ,  setCount] = useState(0);

<<<<<<< HEAD
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  
  //With only 1 argument : 
  useEffect(() => {

    console.log("App wala useEffect is running for count = ", count);
    
    return function () {
      console.log("App wala Clean-up useEffect is running for count" , count);
    }

  })

  function handleUpdate() {

    setCount((prev) => {
      return prev + 1;
    })
    
  }

  function handleBoolean() {
    setVisible((prev) => {
      return !prev;
    })
  }

  return (

    <>
      {console.log(" Mycomponent is rendered inside App.jsx for count = ", count)}
      { console.log("App is also rendered becasue of MyComponent re-render")}
      {visible ? <MyComponent handleUpdate={handleUpdate} count={count} /> : <>Nothing is here !</>}
      <button onClick={handleUpdate}>Update</button> <br></br> <br></br>
      <button onClick={handleBoolean}>Un-Mount</button>
=======
  useEffect(()=>{
     console.log("useEffect is running ...!")
  },[count])

  function handleUpdate(){
      setCount((prev)=>{
        return prev + 1;
      })
  }

  return(
    <>
    {console.log("App component is rendered...")}
     <h1>{count}</h1>
     <button onClick={handleUpdate}>Update</button>
>>>>>>> 37b49c40e7dd3d0772ef8367701c1f58f22816ec
    </>
  )
<<<<<<< HEAD
}

=======
}
>>>>>>> 37b49c40e7dd3d0772ef8367701c1f58f22816ec
