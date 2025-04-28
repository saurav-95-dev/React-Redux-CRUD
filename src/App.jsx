import React, { useState  , useRef, useEffect} from "react";

export default function App(){

    //useRef : DOM-Manipulation : 

    const [count , setCount ] = useState(0);
    let prevCount = useRef();

    useEffect(()=>{
        prevCount.current = count;
    },[count])

    function handleClick(){
  
      setCount((prev)=>{
        return prev+1;
      })
     
    }


    return(

      <>
      <h3>Count : {count}</h3>
      <button onClick={handleClick}>Increment</button>  
       <h3>Previous count : {prevCount.current}</h3>
      </>

    )

}