import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'

interface GetMostLikedPostsInLast24HoursUseCaseRequest {
  limit?: number
}

type GetMostLikedPostsInLast24HoursUseCaseResponse = {
  posts: Post[]
}

export class GetMostLikedPostsInLast24HoursUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    limit,
  }: GetMostLikedPostsInLast24HoursUseCaseRequest = {}): Promise<GetMostLikedPostsInLast24HoursUseCaseResponse> {
    const posts = await this.postsRepository.findMostLikedInLast24Hours(limit)

    return { posts }
  }
}
