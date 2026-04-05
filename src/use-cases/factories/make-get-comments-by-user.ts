import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { GetCommentsByUserUseCase } from '../comments/get-comments-by-user.js'

export function makeGetCommentsByUser() {
  const usersRepository = new PrismaUsersRepository()
  const commentsRepository = new PrismaCommentsRepository()
  const getCommentsByUserUseCase = new GetCommentsByUserUseCase(
    usersRepository,
    commentsRepository,
  )
  return getCommentsByUserUseCase
}
