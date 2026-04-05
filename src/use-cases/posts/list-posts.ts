import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'

type ListPostUseCaseResponse = {
  posts: Post[]
}

export class ListPostUseCase {
  constructor(private postsRepository: PostsRepository) {}
  async execute(): Promise<ListPostUseCaseResponse> {
    const posts = await this.postsRepository.list()

    return { posts }
  }
}
