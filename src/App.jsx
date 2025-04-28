<<<<<<< HEAD
import React from "react";
import ChildComponent from "./components/ChildComponent";
import { useContext } from "react";
import { context } from "./context/Counter";

export default function App(){
  const contextBucket = useContext(context);
  console.log(contextBucket);

  return(
    <>
    <h2>Count : {contextBucket.count}</h2>
    <ChildComponent/>
    <br />
    <br />
    <ChildComponent/><br />
    <br />
    <ChildComponent/><br />
    <br />
    <ChildComponent/>

    </>

  )

=======
import React, { useRef, useState } from "react";

export default function App() {
  
  const btn = useRef();
  const [count, setCount] = useState(0);

  function handleClick() {
   
    setCount((prev) => {
      return prev + 1;
    })
  }

  if (btn.current) {
    btn.current.style.backgroundColor = "red";

  }
  
  
  

  return (
    <>
      <h2>count :{ count} </h2>
      <button onClick={handleClick}  ref={ btn}>Increment</button>
      <button onClick ={()=>{btn.current.style.display = "none"}}>Vanish increment</button>
      
    </>
  )
>>>>>>> 3da6a35274d3a0b27c1d5277fe5b84bafe4c28b3
}