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
}