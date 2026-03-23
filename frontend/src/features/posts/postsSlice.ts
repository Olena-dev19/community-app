import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api/api";
import type { Post } from "../../types/post";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await api.get("/posts");
  return response.data.data; // якщо бекенд повертає { data: posts }
});

export const addPostAsync = createAsyncThunk(
  "posts/add",
  async ({ title, content, userName }: any) => {
    const { data } = await api.post("/posts", {
      title,
      content,
      userName,
    });
    return data;
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action) {
      state.posts.unshift(action.payload);
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
