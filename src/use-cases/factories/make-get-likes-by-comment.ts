import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { PrismaLikesRepository } from '@/repositories/prisma/likes-prisma-repository.js'
import { GetLikesByCommentUseCase } from '../likes/get-likes-by-comment.js'

export function makeGetLikesByComment() {
  const commentsRepository = new PrismaCommentsRepository()
  const likesRepository = new PrismaLikesRepository()
  const getLikesByCommentUseCase = new GetLikesByCommentUseCase(
    commentsRepository,
    likesRepository,
  )
  return getLikesByCommentUseCase
}
