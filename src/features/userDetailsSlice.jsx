import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


//creating action:

export const createUser = createAsyncThunk("createUser" , async (data ,{rejectWithValue})=>{
      const response = await fetch("http://681b0fce17018fe50579cc14.mockapi.io/crud-NIC" , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(data),
      })


      try{
        const result = await response.json();
        return result
      }
      catch(error){
        return isRejectedWithValue(error);
      }
     
      
});


export const userDetails = createSlice({
    name : "userDetail",
    initialState : {
        users : [],
        loading : false,
        error : null,
        
    },
    extraReducers : {
        [createUser.pending] : (state)=>{
            state.loading = true;
            state.users.push(isAction.payload);
        } ,
        
        [createUser.fulfilled] : (state , action)=>{
           state.loading = false;
           state.users.push(action.payload);
        } ,
        [createUser.rejected] : (state , action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
    }

})
export default userDetails.reducer;