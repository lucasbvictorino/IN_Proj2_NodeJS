import { PrismaLikesRepository } from '@/repositories/prisma/likes-prisma-repository.js'
import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { GetLikesByPostUseCase } from '../likes/get-likes-by-post.js'

export function makeGetLikesByPost() {
  const postsRepository = new PrismaPostsRepository()
  const likesRepository = new PrismaLikesRepository()
  const getLikesByPostUseCase = new GetLikesByPostUseCase(
    postsRepository,
    likesRepository,
  )
  return getLikesByPostUseCase
}
