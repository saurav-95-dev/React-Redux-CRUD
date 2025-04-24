// Everything about useMemo Hook --->   
// Everything about useCallback --->

import React, { useState, useMemo } from "react";
import ChildComponent from "./components/ChildComponent";


// Parent component
export default function ParentComponent() {
  const [count, setCount] = useState(0);  // State that updates frequently
  const [name, setName] = useState("Alice"); // Name that can be changed
  const [age, setAge] = useState(25); // Age that can be changed

  // Memoize the object so its reference only changes when 'name' or 'age' changes
  const memoizedObject = function (){
    return { name, age };
  }
  return (
    <div>
      {console.log("ParentComponent rendered...")}
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>

      <div>
        <h2>Change Name and Age:</h2>
        <input
          type="text"
        
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
        <input
          type="number"
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder="Enter Age"
        />
      </div>

      {/* Pass the memoized object to the child */}
      <ChildComponent data={memoizedObject} />
    </div>
  );
}