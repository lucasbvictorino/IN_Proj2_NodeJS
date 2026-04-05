import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { DeletePostUseCase } from '../posts/delete-post.js'

export function makeDeletePost() {
  const postsRepository = new PrismaPostsRepository()
  const usersRepository = new PrismaUsersRepository()
  const deletePostUseCase = new DeletePostUseCase(
    postsRepository,
    usersRepository,
  )
  return deletePostUseCase
}
