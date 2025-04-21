///Immutability in nested object

import React , {useState} from "react"


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
    </>
  )
}