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