import React ,{useCallback, useState} from "react";
import ChildComponent from "./components/ChildComponent";

export default function App() {
  const [count, setCount] = useState(0);
  const [number , setNumber] = useState(0);

  const handleClick = useCallback(()=>{
       setCount((prev)=>{
        return prev+1;
       })
  } , [count , number])

  function handleInput(e){
      setNumber(e.target.value);
  }

  return (
    <div>
      {console.log("App rendered for count = " , {count})}
      <input type="text" placeholder="Enter number" onChange={handleInput} />
      <ChildComponent onClick={handleClick} />
      <p>{count}</p>
    </div>
  );
};