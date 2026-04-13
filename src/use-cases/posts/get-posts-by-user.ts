import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetPostsByUserUseCaseRequest {
  userPublicId: string
}

type GetPostsByUserUseCaseResponse = {
  posts: Post[]
}

export class GetPostsByUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {}
  async execute({
    userPublicId,
  }: GetPostsByUserUseCaseRequest): Promise<GetPostsByUserUseCaseResponse> {
    const user = await this.usersRepository.findBy({
      publicId: userPublicId,
    })
    if (!user) {
      throw new ResourceNotFoundError()
    }

    const posts = await this.postsRepository.findByAuthorId(user.id)

    return { posts }
  }
}
