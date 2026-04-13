import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { NotAllowedError } from '../errors/not-allowed-error.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface DeleteCommentUseCaseRequest {
  publicID: string
  requesterPublicId: string
}

export class DeleteCommentUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private usersRepository: UsersRepository,
  ) {}
  async execute({ publicID, requesterPublicId }: DeleteCommentUseCaseRequest) {
    const comment = await this.commentsRepository.findBy({ publicID })

    if (!comment) {
      throw new ResourceNotFoundError()
    }

    const requester = await this.usersRepository.findBy({
      publicId: requesterPublicId,
    })

    if (requester?.id !== comment.authorId) {
      throw new NotAllowedError()
    }

    await this.commentsRepository.delete(comment.id)
  }
}
