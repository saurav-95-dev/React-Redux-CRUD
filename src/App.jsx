//immutability in state (in object)

import React, { useState } from "react";

export default function App() {

  const [person, setPerson] = useState({
    name: "Saurabh", age: 12, add: "North pole", Qualifications: {

      degree: "Btech",
      branch: "IT",
      
  } });
 
  function handleUpdate() {
    setPerson({...person , name : "Something" , age : 0 , Qualifications : {...person.Qualifications , degree : "Mtech" , branch : "CS"}})
  }

  return (
    <>
      <h1>{person.name}</h1>
      <h1>{person.age}</h1>
      <h1>{person.add}</h1>
      <h1>{person.Qualifications.degree}</h1>
      <h1>{person.Qualifications.branch}</h1>
      
      <button onClick={handleUpdate}>Update</button>
    </>
    
  )
}
