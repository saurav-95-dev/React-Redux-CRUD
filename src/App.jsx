import React from "react";
import {useSelector , useDispatch} from "react-redux";
import {fetchTodos} from "./feature/Todo/Todo.jsx"

export default function App(){
    
    const dispatch = useDispatch();
    const state = useSelector((state) =>{
        return state;
    })

    console.log(state);
    
    function handleClick(){
        dispatch(fetchTodos())
    }
    
    if(state.todo.isLoading){
      return <h1>Load ho rha hai ...</h1>
    }

    return(
        <>
        <div>

        <button onClick={handleClick}>Fetch Todos</button>
        
        {
           state.todo.data &&  state.todo.data.map((data , index)=>{
                return <li key={index}>{data.title}</li>
            })
        }

        </div>
         </>
    )
}