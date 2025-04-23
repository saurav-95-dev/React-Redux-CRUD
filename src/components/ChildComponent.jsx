// ChildComponent.js
import React from "react";

// ChildComponent wrapped with React.memo to prevent unnecessary re-renders
const ChildComponent = React.memo(({ memoizedValue }) => {
  console.log("ChildComponent rendered...");
  return <h2>Memoized Value: {memoizedValue}</h2>;
});

export default ChildComponent;
