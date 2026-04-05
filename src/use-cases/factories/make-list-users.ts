import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ListUserUseCase } from '../users/list-users.js'

export function makeListUsers() {
  const userRepository = new PrismaUsersRepository()
  const listUserUseCase = new ListUserUseCase(userRepository)
  return listUserUseCase
}
