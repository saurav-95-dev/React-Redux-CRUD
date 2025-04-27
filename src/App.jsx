<<<<<<< HEAD
//useRef  : 
//Click counter

import React , {useState , useRef} from "react";
=======
import React, { useState, useCallback, useEffect } from 'react';
>>>>>>> 87e38d4ffbf2d5bf5fc444a2dea97ca1975cd20a

export default function App() {
  const [count, setCount] = useState(0);
<<<<<<< HEAD

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

=======
  const [name, setName] = useState("John");

  const handleClick = useCallback(() => {
    console.log("Calling memoised handling function bcuz u changed count just now !")
    setCount(count + 1);
  }, [count]);

  useEffect(() => {
    console.log('Effect triggered');
  }, [handleClick]);

  function handleInput(e){
    console.log("Current input" , e.target.value)
    setName(e.target.value);
>>>>>>> 87e38d4ffbf2d5bf5fc444a2dea97ca1975cd20a
  }


  
  return (
<<<<<<< HEAD

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
=======
    <div>
      {console.log("App rendered...")}
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
      <input type="text" placeholder='Enter here' onChange={handleInput} />
    </div>
  );
}
>>>>>>> 87e38d4ffbf2d5bf5fc444a2dea97ca1975cd20a
