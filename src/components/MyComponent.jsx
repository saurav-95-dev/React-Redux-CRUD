<<<<<<< HEAD
import React from "react";


export default function MyComponent(props){
    
    console.log(props.userData);
    return(

        <>
        <div className = "user-card">

            <h2>{props.userData.gender}</h2>
            <h2>{props.userData.name.first} {props.userData.name.last}</h2>
            <h2>{props.userData.location.city} ,{props.userData.location.state} , {props.userData.location.country}</h2>
            <h3>{props.userData.email}</h3>
            <img src= {props.userData.picture.medium} alt="no picture available" />
        </div>
        </>

    )
=======
import React, { useEffect } from "react";

export default function MyComponent(props) {


  useEffect(() => {

    console.log("MyComponent wala useEffect is running for count = ", props.count);
     
    return function () {
      console.log("My component wala useEffect Clean-up is running for count = ", props.count);
    }
  } , [props.count])

  
  return (

    <>
      {console.log("MyComponent.jsx is rendered for count  = " , props.count)}
      <h1>Count is : { props.count}</h1>
    </>

  )
>>>>>>> 5773b13ffe80170e301bcf69f4715e8306760ad4
}