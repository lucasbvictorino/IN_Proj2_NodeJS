import type { Comment } from '@/@types/prisma/client.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetCommentsByUserUseCaseRequest {
  userPublicId: string
}

type GetCommentsByUserUseCaseResponse = {
  comments: Comment[]
}

export class GetCommentsByUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private commentsRepository: CommentsRepository,
  ) {}
  async execute({
    userPublicId,
  }: GetCommentsByUserUseCaseRequest): Promise<GetCommentsByUserUseCaseResponse> {
    const user = await this.usersRepository.findBy({
      publicId: userPublicId,
    })
    if (!user) {
      throw new ResourceNotFoundError()
    }

    const comments = await this.commentsRepository.findByAuthorId(user.id)

    return { comments }
  }
}
