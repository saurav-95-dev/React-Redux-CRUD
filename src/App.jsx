import { useState } from "react"


export default function App(){

  //define object here:
  const [person , setPerson] = useState({name : "Saurabh" , post : "Technical Specialist" ,status : false});

  const handleClick=()=>{

       setPerson((prev)=>{
          return {...prev , status : !prev.status}
       })   
  }

  let str = person.status ? "Brilliant" : "Not brilliant"

  return(
    <>
     
     <h1>{person.name}</h1>
     <h1>{person.post}</h1>
     <h1>{person.status}</h1>
     
     <button onClick={handleClick}>Click to flip state</button>
     <h1>He is a {str} person</h1>
    </>
  )
}