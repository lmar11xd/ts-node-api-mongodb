import { IPostRepository, IPostService, Post } from 'types/PostsTypes';
import { Query } from 'types/RepositoryTypes';

export class PostService implements IPostService {

  private postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async createPost(rol: Post): Promise<Post> {
    return this.postRepository.create(rol);
  }

  async findPosts(query?: Query): Promise<Post[]> {
    return this.postRepository.find(query);
  }
  
  async findPostById(id: string): Promise<Post | null> {
    return this.postRepository.findById(id);
  }

  async updatePost(id: string, rol: Partial<Post>): Promise<Post | null> {
    return this.postRepository.update(id, rol);
  }

  async deletePost(id: string): Promise<boolean> {
    return this.postRepository.delete(id);
  }
}