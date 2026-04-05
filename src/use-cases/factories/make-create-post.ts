import { PrismaPostsRepository } from '@/repositories/prisma/posts-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { CreatePostUseCase } from '../posts/create-post.js'

export function makeCreatePost() {
  const userRepository = new PrismaUsersRepository()
  const postRepository = new PrismaPostsRepository()
  const createPostUseCase = new CreatePostUseCase(
    userRepository,
    postRepository,
  )

  return createPostUseCase
}
