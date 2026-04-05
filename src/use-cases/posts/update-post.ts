import type { Post } from '@/@types/prisma/client.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { NotAllowedError } from '../errors/not-allowed-error.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface UpdatePostUseCaseRequest {
  publicID: string
  requesterPublicId: string
  title?: string
  content?: string
}

type UpdatePostUseCaseResponse = {
  post: Post
}

export class UpdatePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}
  async execute({
    publicID,
    requesterPublicId,
    title,
    content,
  }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
    const postToUpdate = await this.postsRepository.findBy({ publicID })

    if (!postToUpdate) {
      throw new ResourceNotFoundError()
    }

    const requester = await this.usersRepository.findBy({
      publicID: requesterPublicId,
    })

    if (requester?.id !== postToUpdate.authorId) {
      throw new NotAllowedError()
    }

    const post = await this.postsRepository.update(postToUpdate.id, {
      title,
      content,
    })

    return { post }
  }
}
