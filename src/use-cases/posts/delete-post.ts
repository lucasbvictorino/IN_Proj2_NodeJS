import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { NotAllowedError } from '../errors/not-allowed-error.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface DeletePostUseCaseRequest {
  publicID: string
  requesterPublicId: string
}

export class DeletePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}
  async execute({ publicID, requesterPublicId }: DeletePostUseCaseRequest) {
    const post = await this.postsRepository.findBy({ publicID })

    if (!post) {
      throw new ResourceNotFoundError()
    }

    const requester = await this.usersRepository.findBy({
      publicID: requesterPublicId,
    })

    if (requester?.id !== post.authorId) {
      throw new NotAllowedError()
    }

    await this.postsRepository.delete(post.id)
  }
}
