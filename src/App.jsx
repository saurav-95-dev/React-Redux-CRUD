import React, { useState  , useRef} from "react";

export default function App(){

    //useRef : 

    const [count , setCount ] = useState(0);
    let a = useRef(0);
    function handleClick(){
      a.current = a.current+1;
      console.log("val of a:",a)
      setCount((prev)=>{
        return prev+1;
      })
    }


    return(

      <>
      <h3>Count : {count}</h3>
      <button onClick={handleClick}>Increment</button>    
      </>

    )

}