//useEffect;
import React from "react"
import MyComponent from "./components/MyComponent"
import { useState , useEffect } from "react"

export default function App() {
   
  useEffect(() => {
     console.log("useEffect is running .. ")
  } , [])
 
  console.log("App component is rendered .. ")
  return (
    <>
      <MyComponent/>
    </>
    
  )
}