import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { CreateUserUseCase } from '../users/create-user.js'

export function makeCreateUser() {
  const userRepository = new PrismaUsersRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)
  return createUserUseCase
}
