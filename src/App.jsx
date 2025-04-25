import React, { useState, useCallback, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
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
  }

  return (
    <div>
      {console.log("App rendered...")}
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
      <input type="text" placeholder='Enter here' onChange={handleInput} />
    </div>
  );
}
