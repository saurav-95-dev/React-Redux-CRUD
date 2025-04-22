<<<<<<< HEAD
//Fetching data from an API:

import React , {useState , useEffect }from "react";
import MyComponent from "./components/MyComponent";
import getData from "./api";

export default function App(){

  const [userData , setUserData] = useState(null);

  useEffect(()=>{
     getData().then((data)=>{
         
         setUserData(data.results[0]);
     })
  },[]) //Run as componentDidMount and component-unmount , It dont run on component state update

  function handleRefresh (){
     getData().then((data)=>{
        setUserData(data.results[0])
     })
  }


  return(

    <>

    {userData ?  <MyComponent userData = {userData}/> : <>Pls Wait...</>}
    <br></br><br></br>
    <button className="refresh-btn" onClick={handleRefresh}>Refresh</button>
     
    </>

  )

}
=======
// --> Covered : Immutable States(Completed)
// --> useEffect all 3 normal variations and 3 clean-up variations
// --> Data fetch from an API in React

import React, { useState, useEffect } from "react";
import MyComponent from "./components/MyComponent";


export default function App() {

  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  
  //With only 1 argument : 
  useEffect(() => {

    console.log("App wala useEffect is running for count = ", count);
    
    return function () {
      console.log("App wala Clean-up useEffect is running for count" , count);
    }

  } , [count])

  function handleUpdate() {

    setCount((prev) => {
      return prev + 1;
    })
    
  }

  function handleBoolean() {
    setVisible((prev) => {
      return !prev;
    })
  }

  return (

    <>
      {console.log(" Mycomponent.jsx is rendered inside App.jsx for count = ", count)}
      { console.log("App.jsx is also rendered becasue of MyComponent re-render")}
      {visible ? <MyComponent handleUpdate={handleUpdate} count={count} /> : <>Nothing is here !</>}
      <button onClick={handleUpdate}>Update</button> <br></br> <br></br>
      <button onClick={handleBoolean}>Un-Mount</button>
    </>
    
  )
}

>>>>>>> 5773b13ffe80170e301bcf69f4715e8306760ad4
