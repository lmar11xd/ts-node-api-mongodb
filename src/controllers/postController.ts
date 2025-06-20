import { Request, Response } from "express";
import { PostRepository } from '@repositories/postRepository';
import { PostService } from '@services/postService';
import { IPostRepository, IPostService, Post } from 'types/PostsTypes';

const rolRepository: IPostRepository = new PostRepository();
const rolService: IPostService = new PostService(rolRepository);

export const findPosts = async (req: Request, res: Response) => {
  console.log("req findPosts:>> ", req.currentUser);
  try {
    const posts = await rolService.findPosts();
    if (posts.length === 0) {
      res.status(404).json({ message: "no posts Found." });
      return;
    }

    res.json(posts);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const findPostById = async (req: Request, res: Response) => {
  try {
    const rol = await rolService.findPostById(req.params.id);
    if (!rol) {
      res.status(404).json({ message: "Not post Found" });
      return;
    }

    res.json(rol);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const newpost: Post = req.body;
    const result = await rolService.createPost(newpost);

    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const posts = await rolService.updatePost(req.params.id, req.body);
    if (!posts) {
      res.status(404).json({ message: "Not post Found" });
      return;
    }

    res.json(posts);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const posts = await rolService.deletePost(req.params.id);
    if (!posts) {
      res.status(404).json({ message: "Not post Found" });
      return;
    }

    res.json(posts);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};