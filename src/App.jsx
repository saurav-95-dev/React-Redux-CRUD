import { useRef, useEffect, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
   
    prevCountRef.current = count;
    console.log("Use Effect ran and has set prevCountRef value .. " , count)
  }, [count]);

  return (
    <>
      {console.log("App is re-rendering and printing prevCountRef and current count")}
      <h1>Current Count: {count}</h1>
      <h2>Previous Count: {prevCountRef.current}</h2>

      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}
