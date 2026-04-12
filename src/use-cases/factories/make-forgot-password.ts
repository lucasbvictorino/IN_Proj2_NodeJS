import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ForgotPasswordUseCase } from '../users/forgot-password.js'

export function makeForgotPassword() {
  const usersRepository = new PrismaUsersRepository()
  const forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository)

  return forgotPasswordUseCase
}
