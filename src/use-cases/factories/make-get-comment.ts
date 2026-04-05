import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { GetCommentUseCase } from '../comments/get-comment.js'

export function makeGetComment() {
  const commentsRepository = new PrismaCommentsRepository()
  const getCommentUseCase = new GetCommentUseCase(commentsRepository)
  return getCommentUseCase
}
