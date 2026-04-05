import { PrismaCommentsRepository } from '@/repositories/prisma/comments-prisma-repository.js'
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { GetCommentsByPostUseCase } from '../comments/get-comments-by-post.js'

export function makeGetCommentsByPost() {
  const postsRepository = new PrismaPostsRepository()
  const commentsRepository = new PrismaCommentsRepository()
  const getCommentsByPostUseCase = new GetCommentsByPostUseCase(
    postsRepository,
    commentsRepository,
  )
  return getCommentsByPostUseCase
}
