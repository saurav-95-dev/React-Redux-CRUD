import React from "react";
import { useContext } from "react";
import { context } from "../context/Counter";

export default function ChildComponent(){
    const contextBucket = useContext(context);

    return(
       <>
       <button onClick={()=>{contextBucket.setCount(contextBucket.count+1)}}>Increment</button> 

       <button onClick={()=>{contextBucket.setCount(contextBucket.count - 1)}}>Decrement</button>
       </>
    )

}