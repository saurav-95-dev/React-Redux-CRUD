import React from "react";

export default function ChildComponent({result}){
  return(
    <>
     <h2>This is a child component</h2>
     {console.log("Child component is rendered ..")}
     <h2>Square of the number that has been input : {result}</h2>
    </>
  )
}