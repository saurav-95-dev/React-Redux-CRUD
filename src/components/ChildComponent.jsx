// ChildComponent.js
import React from "react";

const ChildComponent = React.memo(({data})=>{
  console.log("ChildComponent rendered...");
  return (
    <div>
      <h3>Memoized Object</h3>
      <p>Name: {data.name}</p>
      <p>Age: {data.age}</p>
    </div>
  );
})

export default ChildComponent