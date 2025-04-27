//useRef  : 
//Click counter

import React , {useState , useRef} from "react";

export default function App() {

  const [count, setCount] = useState(0);

  let a = useRef(3);

  function handleClick() {
    setCount((prev) => {
      return prev + 1;
    })
    console.log("count track:", count);
   
  }

  function handleForUseRef() {
    a.current++;
    alert(`value of a is ${a.current}`);

  }


  
  return (

    <>
      {console.log("App component is re-rendering..")}
      <h2>Count : { count}</h2>
      <button onClick={handleClick}>Click here</button>    
      <br></br><br></br>
      <button onClick={handleForUseRef}>Click to change a : </button>
      <h2>Value of a : { a.current}</h2>
    </>
    
  )
}