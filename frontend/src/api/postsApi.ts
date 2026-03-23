import api from "./api/api";

export const createPostAPI = (data: { title: string; content: string }) =>
  api.post("/posts", data);

export const getPostsAPI = () => api.get("/posts");
