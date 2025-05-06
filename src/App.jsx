import React from "react";
import {useSelector , useDispatch} from "react-redux";
import {fetchTodos} from "./feature/Todo/Todo.jsx"

export default function App(){
    
    const dispatch = useDispatch();
    
    function handleClick(){
        dispatch(fetchTodos())
    }

    return(
        <>
        <div>
        <button onClick={handleClick}>Fetch Todos</button>
        </div>
         </>
    )
}