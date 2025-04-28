import React from "react";
import ChildComponent from "./components/ChildComponent";
import { useContext } from "react";
import { context } from "./context/Counter";

export default function App(){
  const contextBucket = useContext(context);
  console.log(contextBucket);

  return(
    <>
    <h2>Count : {contextBucket.count}</h2>
    <ChildComponent/>
    <br />
    <br />
    <ChildComponent/><br />
    <br />
    <ChildComponent/><br />
    <br />
    <ChildComponent/>

    </>

  )

}