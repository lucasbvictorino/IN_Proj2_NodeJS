import type { Comment } from '@/@types/prisma/client.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetCommentUseCaseRequest {
  publicID: string
}

type GetCommentUseCaseResponse = {
  comment: Comment
}

export class GetCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}
  async execute({
    publicID,
  }: GetCommentUseCaseRequest): Promise<GetCommentUseCaseResponse> {
    const comment = await this.commentsRepository.findBy({
      publicID,
    })

    if (!comment) {
      throw new ResourceNotFoundError()
    }

    return { comment }
  }
}
