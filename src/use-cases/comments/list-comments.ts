import type { Comment } from '@/@types/prisma/client.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'

type ListCommentUseCaseResponse = {
  comments: Comment[]
}

export class ListCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}
  async execute(): Promise<ListCommentUseCaseResponse> {
    const comments = await this.commentsRepository.list()

    return { comments }
  }
}
