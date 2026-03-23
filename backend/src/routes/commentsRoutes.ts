import { Router } from "express";
import {
  getCommentsByPostId,
  createComment,
  deleteCommentById,
} from "../controllers/commentsController.js";
import { celebrate } from "celebrate";
import {
  createCommentSchema,
  deleteCommentByIdSchema,
  getCommentsByPostIdSchema,
} from "../validations/commentsValidation.js";

const commentsRoutes = Router();

commentsRoutes.get(
  "/posts/:postId/comments",
  celebrate(getCommentsByPostIdSchema),
  getCommentsByPostId,
);

commentsRoutes.post(
  "/posts/:postId/comments",
  celebrate(createCommentSchema),
  createComment,
);

commentsRoutes.delete(
  "/posts/:postId/comments/:commentId",
  celebrate(deleteCommentByIdSchema),
  deleteCommentById,
);

export default commentsRoutes;
