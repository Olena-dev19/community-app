import { Segments, Joi } from "celebrate";

export const createCommentSchema = {
  [Segments.PARAMS]: Joi.object({
    postId: Joi.string().hex().length(24).required(),
  }),

  [Segments.BODY]: Joi.object({
    text: Joi.string().min(1).required(),
    parentComment: Joi.string().hex().length(24).optional(),
    userName: Joi.string().min(1).required(),
  }),
};

export const getCommentsByPostIdSchema = {
  [Segments.PARAMS]: Joi.object({
    postId: Joi.string().hex().length(24).required(),
  }),
};

export const deleteCommentByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    postId: Joi.string().hex().length(24).required(),
    commentId: Joi.string().hex().length(24).required(),
  }),
};
