import { Segments, Joi } from "celebrate";
export const createPostSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow("").optional(),
    userName: Joi.string().min(1).required(),
  }),
};

export const getAllPostsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }),
};

export const deletePostByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    postId: Joi.string().hex().length(24).required(),
  }),
};
