import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api/api";
import type { Comment } from "../../types/comment";

interface CommentsState {
  comments: Record<string, Comment[]>;
  loading: boolean;
  error: string | null;
}
const initialState: CommentsState = {
  comments: {},
  loading: false,
  error: null,
};

export const fetchCommentsByPost = createAsyncThunk(
  "comments/fetchByPost",
  async (postId: string) => {
    const { data } = await api.get(`/posts/${postId}/comments`);
    return { postId, comments: data };
  },
);

export const addCommentAsync = createAsyncThunk(
  "comments/add",
  async ({ postId, text, parentComment }: any) => {
    const { data } = await api.post(`/posts/${postId}/comments`, {
      text,
      parentComment,
    });
    return { postId, comment: data };
  },
);

export const deleteCommentAsync = createAsyncThunk(
  "comments/delete",
  async ({ postId, commentId }: any) => {
    await api.delete(`/posts/${postId}/comments/${commentId}`);
    return { postId, commentId };
  },
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment(state, action) {
      const { postId, comment } = action.payload;
      if (!state.comments[postId]) {
        state.comments[postId] = [];
      }
      state.comments[postId].push(comment);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.loading = false;
        state.comments[action.payload.postId] = action.payload.comments;
      })
      .addCase(fetchCommentsByPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load comments";
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;

        const addReplyRecursive = (comments: Comment[]): Comment[] => {
          return comments.map((c) => {
            if (c._id === comment.parentComment) {
              return {
                ...c,
                replies: [...(c.replies || []), comment],
              };
            }

            return {
              ...c,
              replies: c.replies ? addReplyRecursive(c.replies) : [],
            };
          });
        };

        if (!comment.parentComment) {
          if (!state.comments[postId]) {
            state.comments[postId] = [];
          }
          state.comments[postId].push(comment);
        } else {
          state.comments[postId] = addReplyRecursive(
            state.comments[postId] || [],
          );
        }
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;

        const removeRecursive = (comments: Comment[]): Comment[] => {
          return comments
            .filter((c) => c._id !== commentId)
            .map((c) => ({
              ...c,
              replies: c.replies?.length ? removeRecursive(c.replies) : [],
            }));
        };

        if (state.comments[postId]) {
          state.comments[postId] = removeRecursive(state.comments[postId]);
        }
      });
  },
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
