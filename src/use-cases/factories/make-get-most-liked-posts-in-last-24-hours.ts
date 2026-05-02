import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { GetMostLikedPostsInLast24HoursUseCase } from '../posts/get-most-liked-posts-in-last-24-hours.js'

export function makeGetMostLikedPostsInLast24Hours() {
  const postsRepository = new PrismaPostsRepository()
  const getMostLikedPostsInLast24HoursUseCase =
    new GetMostLikedPostsInLast24HoursUseCase(postsRepository)

  return getMostLikedPostsInLast24HoursUseCase
}
