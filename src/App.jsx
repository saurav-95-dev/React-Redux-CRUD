import { useState } from "react";

export default function App() {

  //Demo-1
  
  const [ingredients , setIngredients] = useState(["Apple" , "Guava" , "Orange" , "pinapple"]);

  const handleClick=(event)=>{
     
     event.preventDefault();
     const formData = new FormData(event.currentTarget);
     const item = formData.get("new-fruit");
    
     setIngredients((prev)=>{
        return [...prev , item];
     })

     console.log("handleClick function is running and Form got submitted..!");
     console.log(ingredients);
  }





  return (
    <>
     
      <main>
        {console.log("Return is running")}
        <h1>useState</h1>
        <form onSubmit={handleClick}>
          <input type="text" placeholder="Search fruits" name="new-fruit" />
          <button>+Add Ingredients</button>
        </form>
        <ul>
         {ingredients.map((ingredient , index)=>{
          return <li key={index}>{ingredient}</li> //Here we are returning jsx list items !
         })}
        
        </ul>
      </main>

    </>
  )
}