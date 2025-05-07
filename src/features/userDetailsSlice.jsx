import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const userDetails = createSlice({
    name : "userDetail",
    initialState : {
        users : [],
        loading : false,
        error : null,
    },

})
export default userDetails.reducer;