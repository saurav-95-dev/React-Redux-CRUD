import React from "react";

const ChildComponent = React.memo(({result})=>{
   return(
      <>
      {console.log("ChildComponent is rendered ..")}
      <h2>Square of numner that has been input is : {result}</h2>
      </>
   )
})

export default ChildComponent;