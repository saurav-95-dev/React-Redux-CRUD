//useEffect 3 variations :

import React , {useState , useEffect} from "react";

export default function App(){
  
  const [count ,  setCount] = useState(0);

  useEffect(()=>{
     console.log("useEffect is running ...!")
  },[])

  function handleUpdate(){
      setCount((prev)=>{
        return prev + 1;
      })
  }

  return(
    <>
    {console.log("App component is rendered...")}
     <h1>{count}</h1>
     <button onClick={handleUpdate}>Update</button>
    </>
  )
}