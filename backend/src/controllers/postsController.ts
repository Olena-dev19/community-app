import { Request, Response } from "express";
import { Post } from "../models/Post.js";
import { Comment } from "../models/Comment.js";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Post.countDocuments();
    res.json({
      data: posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, userName } = req.body;
    const newPost = await Post.create({
      title,
      content,
      userName,
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const deletePostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const deletedPost = await Post.findOneAndDelete({ _id: postId });
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    await Comment.deleteMany({ postId });
    res.json({ message: "Post and all related comments deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};
