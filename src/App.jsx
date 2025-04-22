
//Fetching data from an API:

import React , {useState , useEffect }from "react";
import MyComponent from "./components/MyComponent";
import getData from "./api";

export default function App(){

  const [userData , setUserData] = useState(null);
  const [visible , setVisible] = useState(true);

  useEffect(()=>{
     getData().then((data)=>{
         
     console.log("App wala useEffect is runnig .. ")
         setUserData(data.results[0]);

     })
  },[]) //Run as componentDidMount and component-unmount , It dont run on component state update

  function handleRefresh (){
     getData().then((data)=>{
        setUserData(data.results[0])
     })
  }

  function handleRemove(){
     setVisible((prev)=>{
        return !prev;
     })
  }


  return(

    <>

    {(userData && visible) ?  <MyComponent userData = {userData}/> : <>Pls Wait...</>}
    <br></br><br></br>
    <button className="refresh-btn" onClick={handleRefresh}>Refresh</button>
    <br></br><br></br>
    <button onClick = {handleRemove}>Remove</button>
     
    </>

  )

}
