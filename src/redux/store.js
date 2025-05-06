import {configureStore} from "@reduxjs/toolkit"
import {todoReducer} from "../feature/Todo/Todo.jsx";


export const store = configureStore({
    reducers : {
       todo : todoReducer,
    },
})