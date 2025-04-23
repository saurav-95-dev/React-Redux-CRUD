// Everything about useMemo Hook --->   
// Everything about useCallback --->

import React, { useState, useMemo } from "react";
import ChildComponent from "./components/ChildComponent";


// Parent component
export default function App() {
  const [count, setCount] = useState(0);  // State that updates frequently
  const [number, setNumber] = useState(0); // The number that influences the calculation

  // Expensive function to simulate a heavy calculation
  const expensiveCalculation = (num) => {
    console.log("Calculating expensive task...");
    for (let i = 0; i < 1000000000; i++) {} // Simulate delay
    return num * 2;
  };

  // Memoize the result of the expensive calculation, only recalculating when 'number' changes
  const memoizedResult = useMemo(() => {
    return expensiveCalculation(number); // Only recompute when 'number' changes
  }, [number]);

  return (
    <div>
      {console.log("ParentComponent rendered...")}
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>

      <div>
        <h2>Input Number for Calculation:</h2>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
        />
      </div>

      {/* Pass the memoized result to the child */}
      <ChildComponent memoizedValue={memoizedResult} />
    </div>
  );
}
