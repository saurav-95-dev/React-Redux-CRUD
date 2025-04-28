import React from "react";
import { useContext } from "react";
import { context } from "../context/Cart";

export default function Cart(){

    const contextBucket = useContext(context);
    console.log(contextBucket);

    let total = contextBucket.items.reduce((a,b) => a + b.price,0)

    return(

        <>
        <br /> <br />
        <h2>Cart</h2>
        {
            contextBucket ? contextBucket.items.map((item , index)=>{
                return <li key= {index}> {item.name} - {item.price}</li>
            }) : <><h4>No item found ..!</h4></>
        }
        <h3>Total Bill : {total} </h3>
        </>

    )

}