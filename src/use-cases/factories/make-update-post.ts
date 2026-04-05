import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { UpdatePostUseCase } from '../posts/update-post.js'

export function makeUpdatePost() {
  const postsRepository = new PrismaPostsRepository()
  const usersRepository = new PrismaUsersRepository()
  const updatePostUseCase = new UpdatePostUseCase(
    postsRepository,
    usersRepository,
  )
  return updatePostUseCase
}
