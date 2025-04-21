// --> Covered : Immutable States(Completed)
// --> useEffect all 3 normal variations and 3 clean-up variations
// --> Data fetch from an API in React

import React, { useState, useEffect } from "react";
import MyComponent from "./components/MyComponent";


export default function App() {

  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  
  //With only 1 argument : 
  useEffect(() => {

    console.log("App wala useEffect is running for count = ", count);
    
    return function () {
      console.log("App wala Clean-up useEffect is running for count" , count);
    }

  } , [count])

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
      {console.log(" Mycomponent.jsx is rendered inside App.jsx for count = ", count)}
      { console.log("App.jsx is also rendered becasue of MyComponent re-render")}
      {visible ? <MyComponent handleUpdate={handleUpdate} count={count} /> : <>Nothing is here !</>}
      <button onClick={handleUpdate}>Update</button> <br></br> <br></br>
      <button onClick={handleBoolean}>Un-Mount</button>
    </>
    
  )
}

