// Everything about useMemo Hook --->   
// Everything about useCallback --->

import React, { useMemo, useState } from "react";

export default function App() {
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);

  // Simulating an expensive calculation
  const expensiveTask = (num) => {
    console.log("Calculating expensive task...");
    for (let i = 0; i < 1000000000; i++) {} // Simulate a delay
    return num * 2;
  };

  // Memoizing the expensive calculation based on 'number'
  const memoizedResult = useMemo(() => {
    console.log("Expensive task is being recalculated...");
    return expensiveTask(number); // Only recompute when 'number' changes
  }, [number]); // The expensive task is only recomputed when 'number' changes

  
  // Handlers for count and number input
  function handleCountClick() {
    console.log("Count button clicked");
    setCount((prev) => prev + 1); // Increment count (this will not affect the expensive calculation)
  }

  function handleInputChange(event) {
    setNumber(event.target.value); // Update the input number
  }

  return (
    <>
      {console.log("App rendered..")}
      <h1>Count: {count}</h1>
      <button onClick={handleCountClick}>Increment Count</button>
      
      <div>
        <h2>Input Number for Expensive Calculation:</h2>
        <input
          type="number"
          value={number}
          onChange={handleInputChange}
          placeholder="Enter a number"
        />
        <h3>Memoized Expensive Result: {memoizedResult}</h3>
      </div>
    </>
  );
}
