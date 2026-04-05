import { PrismaLikesRepository } from '@/repositories/prisma/likes-prisma-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { GetLikesByUserUseCase } from '../likes/get-likes-by-user.js'

export function makeGetLikesByUser() {
  const usersRepository = new PrismaUsersRepository()
  const likesRepository = new PrismaLikesRepository()
  const getLikesByUserUseCase = new GetLikesByUserUseCase(
    usersRepository,
    likesRepository,
  )
  return getLikesByUserUseCase
}
