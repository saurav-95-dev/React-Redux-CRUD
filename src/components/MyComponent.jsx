import React, { useEffect } from "react";

export default function MyComponent(props) {


  useEffect(() => {

    console.log("MyComponent wala useEffect is running for count = ", props.count);
     
    return function () {
      console.log("My component wala useEffect Clean-up is running for count = ", props.count);
    }
  } , [])

  
  return (

    <>
      {console.log("MyComponent.jsx is rendered for count  = " , props.count)}
      <h1>Count is : { props.count}</h1>
    </>

  )
}