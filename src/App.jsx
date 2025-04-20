//Immutaility in state (Arrays):

import { useState } from "react"

export default function App() {

  const [item, setItem] = useState(["Apple", "orange", "guava"]);

  function handleUpdate() {
    console.log("handleUpdate function is running .. ")
    //item.push("new item"); //Directly changing the array
    setItem([...item, "new Item"]);
  }

  return (
    <>
      
      <ul>
        {
          item.map((fruits , index) => {
            return <li key={index}>{ fruits}</li>
          })
        }
      </ul>
      <button onClick={handleUpdate}>Update</button>

    </>
  )
}