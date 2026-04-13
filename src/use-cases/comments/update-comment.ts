import type { Comment } from '@/@types/prisma/client.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { NotAllowedError } from '../errors/not-allowed-error.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface UpdateCommentUseCaseRequest {
  publicID: string
  requesterPublicId: string
  content: string
}

type UpdateCommentUseCaseResponse = {
  comment: Comment
}

export class UpdateCommentUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private usersRepository: UsersRepository,
  ) {}
  async execute({
    publicID,
    requesterPublicId,
    content,
  }: UpdateCommentUseCaseRequest): Promise<UpdateCommentUseCaseResponse> {
    const commentToUpdate = await this.commentsRepository.findBy({ publicID })

    if (!commentToUpdate) {
      throw new ResourceNotFoundError()
    }

    const requester = await this.usersRepository.findBy({
      publicId: requesterPublicId,
    })

    if (requester?.id !== commentToUpdate.authorId) {
      throw new NotAllowedError()
    }

    const comment = await this.commentsRepository.update(commentToUpdate.id, {
      content,
    })

    return { comment }
  }
}
