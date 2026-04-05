import { PrismaLikesRepository } from '@/repositories/prisma/likes-prisma-repository.js'
import { GetLikeUseCase } from '../likes/get-like.js'

export function makeGetLike() {
  const likesRepository = new PrismaLikesRepository()
  const getLikeUseCase = new GetLikeUseCase(likesRepository)
  return getLikeUseCase
}
