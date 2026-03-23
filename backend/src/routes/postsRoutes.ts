import { Router } from "express";
import {
  getAllPosts,
  createPost,
  deletePostById,
} from "../controllers/postsController.js";
import { celebrate } from "celebrate";
import {
  createPostSchema,
  getAllPostsSchema,
  deletePostByIdSchema,
} from "../validations/postsValidation.js";

const postsRoute = Router();

postsRoute.get("/posts", celebrate(getAllPostsSchema), getAllPosts);

postsRoute.post("/posts", celebrate(createPostSchema), createPost);

postsRoute.delete(
  "/posts/:postId",
  celebrate(deletePostByIdSchema),
  deletePostById,
);

export default postsRoute;
