import { model, Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Comment = model("Comment", CommentSchema);
