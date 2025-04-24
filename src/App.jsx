//useMemo : 1 --> Using to avoid unecessary calculations.(Via counter and input):

// Everything about useMemo Hook --->   
// Everything about useCallback --->

import React, { useMemo, useState } from "react";

export default function App(){

  const [count , setCount] = useState(0);
  const [number , setNumber ] = useState(0);
  
  function expensiveTask(num){
     for(let i=0;i<100000000;i++){

     }
     console.log("Inside expensive task function")
     return num*2;
  }

  const memoisedResult = useMemo(()=>{
    return expensiveTask(number)
  }, [number])

  function handleCountClick(){
    console.log("Count is clicked")
     setCount((prev)=>{
        return prev+1;
     })
  }

  function handleInput(e){
      console.log("Input value changed:", e.target.value)
      setNumber(e.target.value)
  }

  return (
    <>
    {console.log("App is rendered")}
    <h2>Count : {count}</h2>
    <button onClick={handleCountClick}>Click</button>
    <input type="number" placeholder="Enter number" onChange={handleInput} />
    <h3>Doubled value of input integer is : {memoisedResult}</h3>
    </>
  )
}