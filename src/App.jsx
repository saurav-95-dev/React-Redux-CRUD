import React, { useState  , useRef} from "react";

export default function App(){

    //useRef : DOM-Manipulation : 

    const [count , setCount ] = useState(0);
    let btn = useRef()
    let a = useRef(0);

    function handleClick(){
      a.current = a.current+1;
      console.log("val of a:",a)
      setCount((prev)=>{
        return prev+1;
      })
      if(btn.current){
        btn.current.style.backgroundColor = "green";
      }
    }


    return(

      <>
      <h3>Count : {count}</h3>
      <button  ref = {btn} onClick={handleClick}>Increment</button>  
      <button onClick={()=>{btn.current.style.display = "none"}}>Vanish increment </button>  
      </>

    )

}