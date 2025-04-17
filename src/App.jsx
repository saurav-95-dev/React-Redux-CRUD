import { useState } from "react";


export default function(){

  const [ingredients , setIngredients] = useState(["Apple" , "Guava" , "pinapple" , "grapes"]);
  
  const handleClick=(event)=>{
     console.log("Handle click function is running...!");
     event.preventDefault();
     const formData  = new FormData(event.currentTarget);
     const newItem  = formData.get("new-item");
     console.log(newItem);
     setIngredients((prev)=>{
        return [...prev , newItem];
     })

  }

  return(
    <>
    {console.log("return of app component is running..!")};
    {console.log(ingredients)}
    <h1>useState demo-1</h1>
    <main>
      <form onSubmit={handleClick}>
        <input type="text" placeholder="Search fruits" name="new-item" />
        <button>Click here</button>
      </form>
      <ul>
        {
          ingredients.map((ingredient , index)=>{
            return <li key={index}>{ingredient}</li>
          })
        }
      </ul>
    </main>
    </>
    
  )

}