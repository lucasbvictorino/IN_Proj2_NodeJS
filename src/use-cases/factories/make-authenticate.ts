import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { AuthenticateUserUseCase } from '../users/authenticate.js'

export function makeAuthenticateUsers() {
  const userRepository = new PrismaUsersRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)
  return authenticateUserUseCase
}
