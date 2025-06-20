import { PostModel } from '@models/Posts';
import { IPostRepository, Post } from 'types/PostsTypes';
import { Query } from 'types/RepositoryTypes';

export class PostRepository implements IPostRepository {

  async create(data: Post): Promise<Post> {
    const newPost = new PostModel(data);
    return await newPost.save();
  }

  async find(query?: Query): Promise<Post[]> {
    return await PostModel.find(query || {}).exec();
  }

  async findById(id: string): Promise<Post | null> {
    return await PostModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Post>): Promise<Post | null> {
    console.log(id);
    return await PostModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await PostModel.findByIdAndDelete(id).exec();
    return deleted != null;
  }
}