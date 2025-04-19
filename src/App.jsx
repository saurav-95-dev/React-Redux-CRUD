import { useState } from "react"


export default function App(){

<<<<<<< HEAD
  
  
=======
  //define object here:
  const [person , setPerson] = useState({name : "Saurabh" , post : "Technical Specialist" ,status : false});
>>>>>>> 5387b29c1770de7456131edcb7ea08bb1e90ad50

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