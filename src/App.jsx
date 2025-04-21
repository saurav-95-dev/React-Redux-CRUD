<<<<<<< HEAD
///Immutability in nested object

import React , {useState} from "react"
=======
//immutability in state (in object)
>>>>>>> e1606272987aed1a40314f12f6b366f2d9a36f9e

import React, { useState } from "react";

<<<<<<< HEAD
export default function App(){
  
  const [person , setPerson] = useState({name : "Saurabh" , age : 12 , qualification : {degree : "Btech" , Branch : "IT"}});

  function handleUpdate(){
    //let newPerson = JSON.parse(JSON.stringify(person));
    
    setPerson((prev)=>{
       return {...prev , name : "New name" , age : 321, qualification  : {...prev.qualification , degree : "Arts" , Branch : "Commerce"}}
    })
   
    
  }

  return(
    <>
    <h2>{person.name}</h2>
    <h2>{person.age}</h2>
    <h2>{person.qualification.degree}</h2>
    <h2>{person.qualification.Branch}</h2>
    <button onClick={handleUpdate}>Update</button>
=======
export default function App() {

  const [person, setPerson] = useState({
    name: "Saurabh", age: 12, add: "North pole", Qualifications: {

      degree: "Btech",
      branch: "IT",
      
  } });
 
  function handleUpdate() {
    setPerson((prev) => {
      const newPerson = JSON.parse(JSON.stringify(prev));
      newPerson.name = "Something";
      newPerson.age = 12345;
      newPerson.Qualifications.branch = "CS"
      return newPerson
    })
  }

  return (
    <>
      <h1>{person.name}</h1>
      <h1>{person.age}</h1>
      <h1>{person.add}</h1>
      <h1>{person.Qualifications.degree}</h1>
      <h1>{person.Qualifications.branch}</h1>
      
      <button onClick={handleUpdate}>Update</button>
>>>>>>> e1606272987aed1a40314f12f6b366f2d9a36f9e
    </>
    
  )
}
