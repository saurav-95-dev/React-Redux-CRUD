import React, { useContext, useState } from "react";
import { createContext } from "react";


export const context = createContext(null);

export const ContextProvider=(props)=>{

    const [count , setCount] = useState(12);
    return(

        <context.Provider value={{count , setCount}}>
            {props.children}
        </context.Provider>

    )
}