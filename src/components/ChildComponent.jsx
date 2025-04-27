import React, { useEffect } from "react";


const ChildComponent = React.memo(( {item , onClick})=>{
  console.log('ListItem re-rendered');
  return (
    <div>
      <span>{item} </span>
      <button onClick={() => onClick(item)}> Delete</button>
      <br></br> <br></br> <br></br>
    </div>
  )
})

export default ChildComponent