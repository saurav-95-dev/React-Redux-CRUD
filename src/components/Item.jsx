import React  from "react";
import { useContext } from "react";
import { context } from "../context/Cart";

export default function Item(props){

    const contextBucket = useContext(context);
    console.log(contextBucket);

    return(

        <>
        <div className="item-card">
           <h3>Item name : {props.name}  </h3>
           <h3>Item Price : ${props.price}</h3>
           <button onClick={()=>{contextBucket.setItems([...contextBucket.items ,{ name : props.name, price : props.price}])}}>Add to cart</button>
        </div>
        </>

    )
}