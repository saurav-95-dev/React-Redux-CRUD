import React, { useState } from "react";
import { createContext } from "react";

export const context = createContext(null);

export const ContextProvider=(props)=>{

    const [items , setItems] = useState([]);
    return(

        <context.Provider value = {{items, setItems}}>
            {props.children}
        </context.Provider>

    )
}