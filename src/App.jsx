import React, { useState } from "react";

export default function App() {
   
  const [person, setPerson] = useState({ name: "Saurabh", age: 0, add: "North pole" });
  
  function handleUpdate() {
  
    setPerson({...person , name : "swaha" , designation : "SDE1" , age : 340});
  }
  
  return (
    <>
      <h1>name : {person.name}</h1>
      <h1>age : {person.age}</h1>
      <h1>add : {person.add}</h1>
      <h1>designation : { person.designation}</h1>
      
      <button onClick={handleUpdate}>Update</button>
    </>
    
  )
}