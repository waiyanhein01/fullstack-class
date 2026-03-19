import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from ".";
import { createAppAsyncThunk } from "./withType";

const BASE_API_URL = "http://localhost:4000/posts"

interface Post {
    id: string,
    title: string,
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
export const fetchPosts = createAppAsyncThunk("posts/fetchPosts", async () => {
    // call api
    const response = await axios.get(BASE_API_URL)
    return response.data
}, {
    condition(arg, thunkApi) {
        const postsStatus = selectPostsStatus(thunkApi.getState())
        if (postsStatus !== "idle") {
            return false
        }
    },
})

export const createNewPost = createAppAsyncThunk("posts/createNewPost", async (post: Omit<Post, "id">) => {
    const response = await axios.post(BASE_API_URL, post)
    await new Promise((resolve) => setTimeout(resolve, 4000))
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
            .addCase(createNewPost.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(createNewPost.rejected, (state, action) => {
                state.error = action.error.message || "Failed to create new post"
            })
    }
})

export default PostsSlice.reducer

export const selectPostsStatus = (state: RootState) => state.posts.status