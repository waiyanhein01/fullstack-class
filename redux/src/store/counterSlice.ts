import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";

interface User {
    id: number,
    name: string,
    age: number
}

interface CounterSliceState {
    value: number,
    users: User[]
}

const initialState: CounterSliceState = {
    value: 0, users: [
        { id: 1, name: "Alice", age: 30 },
        { id: 2, name: "Bob", age: 16 },
        { id: 3, name: "Charlie", age: 35 }
    ]
}

const counterSlice = createSlice({
    name: "counter", // unique identifying the slice
    initialState,

    // reducers are the functions that handle actions and update the state(write data)
    reducers: {
        increment: (state) => { state.value += 1 },
        decrement: (state) => { state.value -= 1 },
        incrementByAmount: (state, action: PayloadAction<number>) => { state.value += action.payload }
    },

    // selectors are functions that extract specific pieces of state(read data)
    selectors: {
        adultUsers: (state) => {
            const newUsers = state.users.filter(user => user.age >= 18)
            return newUsers.length
        }
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions // approach 1
export const counter = (state: RootState) => state.counter.value // approach 2
export const { adultUsers } = counterSlice.selectors // for learn selectors
export default counterSlice.reducer