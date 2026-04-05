import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { UpdateCommentUseCase } from '../comments/update-comment.js'

export function makeUpdateComment() {
  const commentsRepository = new PrismaCommentsRepository()
  const usersRepository = new PrismaUsersRepository()
  const updateCommentUseCase = new UpdateCommentUseCase(
    commentsRepository,
    usersRepository,
  )
  return updateCommentUseCase
}
