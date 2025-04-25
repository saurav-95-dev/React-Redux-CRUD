import React ,{useCallback, useState} from "react";
import ChildComponent from "./components/ChildComponent";

export default function App() {

  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3" , "Item 4"]);
  const [filter, setFilter] = useState("");

  // Memoizing the delete function to prevent unnecessary re-renders
  const handleDelete = useCallback((itemToDelete) => {
    console.log("Delete function is executing ... !")
    setItems((items)=>{
      return items.filter(item => item !== itemToDelete)
    });
  }, [items]);

  return (
    <div>
      <input 
        type="text" 
        placeholder="Filter items"
        onChange={(e) => setFilter(e.target.value)} 
      />
      <br></br>
      <br></br>
      {items 
        .filter(item => item.includes(filter))
        .map((item, index) => (
          <ChildComponent key={index} item={item} onClick={handleDelete} />
        ))
      }
    </div>
  );
}