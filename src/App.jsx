import { useState } from "react"



export default function App(){

   const [count , setCount] = useState(0);

   const increaseValue=()=>{
       setCount((prev)=>{
          return prev + 1;
       })
   }

   const decreaseValue=()=>{
      setCount((prev)=>{
        return prev-1;
      })
   }
   return(
       <>
       <h2>useState demo-2</h2>
       <h1>{count}</h1>
       <button onClick={increaseValue}>+Increase</button>
       <button onClick = {decreaseValue}>-Decrease</button>
       </>
   )
}