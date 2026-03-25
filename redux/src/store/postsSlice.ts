import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from ".";
import { createAppAsyncThunk } from "./withType";

const BASE_API_URL = "http://localhost:4000/posts"

interface Post {
    id: string,
    title: string,
    userId: string
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

// Create Post
export const createNewPost = createAppAsyncThunk("posts/createNewPost", async (post: Omit<Post, "id">) => {
    const response = await axios.post(BASE_API_URL, post)
    await new Promise((resolve) => setTimeout(resolve, 4000))
    return response.data
})

// Update Post
export const updatePost = createAppAsyncThunk("posts/updatePost", async (post: Partial<Post>) => {
    const response = await axios.patch(`${BASE_API_URL}/${post.id}`, post)
    return response.data
})

// Delete Post
export const deletePost = createAppAsyncThunk("posts/deletePost", async (id: string) => {
    await axios.delete(`${BASE_API_URL}/${id}`)
    return id
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
            // for create post
            .addCase(createNewPost.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(createNewPost.rejected, (state, action) => {
                state.error = action.error.message || "Failed to create new post"
            })

            // for patch method
            // .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
            //     const { id, title } = action.payload
            //     const existingPost = state.items.find(post => post.id === id)
            //     if (existingPost) {
            //         existingPost.title = title
            //     }
            // })

            // for put method
            .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
                const index = state.items.findIndex(post => post.id === action.payload.id)
                if (index !== -1) {
                    state.items[index] = action.payload
                }
            })

            // for delete
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter(post => post.id !== action.payload)
            })
    }
})

export default PostsSlice.reducer

export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectAllPosts = (state: RootState) => state.posts.items

// Wrong way(no caching)
// export const selectPostsByUserId = (state: RootState, userId: string) => {
//     const posts = selectAllPosts(state)
//     return posts.filter((post) => post.userId === userId)
// }

// Right way (caching)
export const selectPostsByUserId = createSelector(
    selectAllPosts,
    (state: RootState, userId: string) => userId,
    (posts, userId) => posts.filter((post) => post.userId === userId)
)