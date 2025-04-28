import React from "react";
import Item from "./components/Item";
import Cart from "./components/Cart";
import { useContext } from "react";
import { context } from "./context/Cart";

export default function App(){

  const contextBucket = useContext(context);
  console.log(contextBucket)

    return(

      <>
        <Item name="Mackbook" price = {10000}/>
        <Item name="Keyboard" price = {700}/>
        <Item name="Mouse" price = {100}/>
        <Item name="Egg Roll" price = {18000}/>
        <Cart/>
        
      </>

    )

}