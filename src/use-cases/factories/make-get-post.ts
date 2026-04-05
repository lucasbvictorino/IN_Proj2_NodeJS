import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { GetPostUseCase } from '../posts/get-post.js'

export function makeGetPost() {
  const postsRepository = new PrismaPostsRepository()
  const getPostUseCase = new GetPostUseCase(postsRepository)
  return getPostUseCase
}
