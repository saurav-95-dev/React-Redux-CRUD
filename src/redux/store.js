import {configureStore} from "@reduxjs/toolkit"
import saurabhReducer from "../feature/Counter/Counter.jsx"

const store = configureStore({

    reducer : {
       saurabh : saurabhReducer
    },
})