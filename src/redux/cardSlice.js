import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    card:[],
    status: "idle",
    error: null,
}

export const fetchCards = createAsyncThunk("card/fetchCards", async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    console.log(`data:`, data);
    return data;
})

const cardSlices = createSlice({
    name: "cards",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(fetchCards.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchCards.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.card = action.payload
        })
        .addCase(fetchCards.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
})


export default cardSlices.reducer