import api from "./api/api";

export const createCommentAPI = (
  postId: string,
  data: { text: string; parentComment?: string },
) => api.post(`/posts/${postId}/comments`, data);
