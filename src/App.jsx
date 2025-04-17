import { useState } from "react"



export default function(){
   
  const [val , setVal] = useState(false);
  
  const handleClick=()=>{
    setVal((prev)=>{
      return !prev;
   })
 
  }

  let str = val ? "This is ture" : "This is false"
  return(
    <>
    <h2>useState demo-3</h2>
    <h1>{str}</h1>
    <button onClick ={handleClick}>Press to flip</button>
    </>
  )

}