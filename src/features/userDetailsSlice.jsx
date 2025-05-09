import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// For creating user:
export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
    try {
        const response = await fetch("http://681b0fce17018fe50579cc14.mockapi.io/crud-NIC", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);  // send full error
    }
});

// For showing users:
export const showUser = createAsyncThunk("showUser", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch("https://681b0fce17018fe50579cc14.mockapi.io/crud-NIC");
        
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});

// Slice
export const userDetails = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = [...state.users, action.payload];  // immutable update
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went wrong"; // use action.payload if it's an error object
            })
            .addCase(showUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(showUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; // immutable update
            })
            .addCase(showUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went wrong"; // use action.payload if it's an error object
            });
    },
});

export default userDetails.reducer;
