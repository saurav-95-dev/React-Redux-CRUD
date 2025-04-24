//useMemo : 2 --> Preventing unecessary re-rendering of child components via React.memo !

import React, { useState } from "react";
import ChildComponent from "./components/ChildComponent"

export default function App(){
  
  const [count , setCount] = useState(0);
  const [number  , setNumber] = useState(0);

  function expensiveTask(number){
    console.log("Inside expensiveTask function..");

    return number*number;

  }

  const result = expensiveTask(number);



  function handleCountClick(){
    console.log("Incerment button is clicked..")
     setCount((prev)=>{
       return prev+1;
     })

  }
  
  function handleInput(e){
    setNumber(e.target.value);
    console.log("Current input value: ",e.target.value);
  }

  return(
    <>
      {console.log("App component is rendered..")}
     <h2>count : {count}</h2>
     <button onClick={handleCountClick}>Increment</button>
     <br></br><br></br>
     <input type="number" placeholder="Enter number" onChange={handleInput} />
     <ChildComponent result = {result}/>
    </>

  )
}
