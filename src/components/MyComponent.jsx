
import React from "react";
import { useState , useEffect } from "react";

export default function MyComponent() {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      console.log(`Effect runs for count = ${count}`);
  
      return () => {
        console.log(`Cleanup runs for count = ${count}`);
      };
    }, [count]);
  
    return (
      <>
        <h2>Count: {count}</h2>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </>
    );
  }
  