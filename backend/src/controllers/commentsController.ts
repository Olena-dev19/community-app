import { Request, Response } from "express";
import { Comment } from "../models/Comment.js";
import { Post } from "../models/Post.js";

interface PostParams {
  postId: string;
}
export const getCommentsByPostId = async (
  req: Request<PostParams>,
  res: Response,
) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId })
      .sort({ createdAt: 1 })
      .lean();
    const map: Record<string, any> = {};
    comments.forEach((c) => {
      map[c._id.toString()] = { ...c, replies: [] };
    });

    const result: any[] = [];
    comments.forEach((c) => {
      if (!c.parentComment) {
        result.push(map[c._id.toString()]);
      } else {
        const parent = map[c.parentComment.toString()];
        if (parent) {
          parent.replies.push(map[c._id.toString()]);
        }
      }
    });

    res.json(result);
  } catch {
    res.status(500).json({ error: "Failed to retrieve comments" });
  }
};

export const createComment = async (
  req: Request<PostParams>,
  res: Response,
) => {
  try {
    const { postId } = req.params;
    const { text, parentComment, userName } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }
    if (parentComment) {
      const parent = await Comment.findById(parentComment);
      if (!parent) {
        return res.status(400).json({ message: "Parent comment not found" });
      }
    }
    const comment = await Comment.create({
      postId,
      text,
      parentComment: parentComment || null,
      userName,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
};

export const deleteCommentById = async (
  req: Request<{ postId: string; commentId: string }>,
  res: Response,
) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    const deleteReplies = async (parentId: string) => {
      const replies = await Comment.find({ parentComment: parentId });
      for (const reply of replies) {
        await deleteReplies(reply._id.toString());
        await reply.deleteOne();
      }
    };
    await deleteReplies(commentId);
    await comment.deleteOne();
    res.json({
      message: "Comment and all related replies deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
