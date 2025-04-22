//Fetching data from an API ---> Completed
//Everything about props ---> 
// Everything about useMemo Hook --->  

import React, { useState } from "react";
import MyComponent from "./components/MyComponent";

export default function App(){

  const [toggle , setToggle] = useState(false);
  
  function handleToggle(){
     setToggle((prev)=>{
       return !prev
     })
  }

  return (

    <>
     <h2>This is just a public content . <br></br>Click below button to reveal the main content</h2>
     
     <br></br>
     <button onClick={handleToggle}>ON</button>
    {toggle ?  <MyComponent >
      <h2>This is a secret content</h2>
      <h2>This is what i was waiting for</h2>
      <h2>My time is going to come soon...</h2>
      <h2>I will make it happen anyhow..</h2>
    
    </MyComponent> : <></>}
    </>

  )

}
