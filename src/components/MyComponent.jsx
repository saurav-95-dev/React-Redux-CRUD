import React, { useState } from "react";

export default function MyComponent(props){

    const [visibility , setVisibility] = useState(false);

    console.log(props.children)

    function handleVisibility(){
        setVisibility((prev)=>{
           return !prev;
        })
    }

    return(

        <>
         <button onClick={handleVisibility}>Reveal</button>
         <ul>
         {visibility ? React.Children.map(props.children , (child , index)=>{
            return <li key={index}>{child}</li>
         }) : <></>}
         </ul>
        </>

    )
}