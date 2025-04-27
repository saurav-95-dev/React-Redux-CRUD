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
}