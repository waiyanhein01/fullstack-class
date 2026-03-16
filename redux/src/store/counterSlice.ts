import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CounterSliceState {
    value: number
}

const initialState: CounterSliceState = { value: 0 }

const counterSlice = createSlice({
    name: "counter", // unique identifying the slice
    initialState,
    reducers: {
        increment: (state) => { state.value += 1 },
        decrement: (state) => { state.value -= 1 },
        incrementByAmount: (state, action: PayloadAction<number>) => { state.value += action.payload }
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer