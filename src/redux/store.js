import {configureStore} from "@reduxjs/toolkit"
import userDetails from "../features/userDetailsSlice.jsx";


export const store = configureStore({
    
    reducer : {

       userDetail : userDetails,

    },
})