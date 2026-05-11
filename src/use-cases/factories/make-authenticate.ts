import { compare } from 'bcryptjs'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { AuthenticateUserUseCase, type HashComparer, type TokenGenerator } from '../users/authenticate.js'

export function makeAuthenticateUsers(tokenGenerator: TokenGenerator) {
  const userRepository = new PrismaUsersRepository()
  const hashComparer: HashComparer = {
    compare: (plain, hashed) => compare(plain, hashed),
  }
  const authenticateUserUseCase = new AuthenticateUserUseCase(
    userRepository,
    hashComparer,
    tokenGenerator,
  )
  return authenticateUserUseCase
}
