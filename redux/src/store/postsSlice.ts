import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API_URL = "http://localhost:4000/posts"

interface Post {
    id: number,
    title: string,
    author: string
}

interface PostsSliceState {
    items: Post[],
    status: "idle" | "pending" | "succeeded" | "failed",
    error: string | null
}

const initialState: PostsSliceState = {
    items: [],
    status: "idle",
    error: null
}

// dispatch(fetchPosts()) // type "posts/fetchPosts"
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    // call api
    const response = await axios.get(BASE_API_URL)
    return response.data
})

// 1. "posts/fetchPosts/pending"
// OR 
// "posts/fetchPosts/fulfilled", payload: response.data
// OR 
// "posts/fetchPosts/rejected", payload: response.data

const PostsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = "pending"
            state.error = null
        })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.items.push(...action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || "Failed to fetch posts"
            })
    }
})

export default PostsSlice.reducer