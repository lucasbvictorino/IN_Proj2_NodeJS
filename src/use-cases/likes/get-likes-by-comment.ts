import type { Like } from '@/@types/prisma/client.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { LikesRepository } from '@/repositories/likes-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetLikesByCommentUseCaseRequest {
  commentPublicID: string
}

type GetLikesByCommentUseCaseResponse = {
  likes: Like[]
}

export class GetLikesByCommentUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private likesRepository: LikesRepository,
  ) {}
  async execute({
    commentPublicID,
  }: GetLikesByCommentUseCaseRequest): Promise<GetLikesByCommentUseCaseResponse> {
    const comment = await this.commentsRepository.findBy({
      publicID: commentPublicID,
    })
    if (!comment) {
      throw new ResourceNotFoundError()
    }

    const likes = await this.likesRepository.findByCommentId(comment.id)

    return { likes }
  }
}
