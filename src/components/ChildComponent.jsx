import React, { useEffect } from "react";

// export default function ChildComponent({ onClick }){
//   console.log("Child rendered");
//   return <button onClick={onClick}>Increment</button>;
// };

const ChildComponent = React.memo(({onClick})=>{
  console.log("Child component ...");
  return(
    <>
    <button onClick={onClick}>Increment</button>
    </>
  )
})

export default ChildComponent;