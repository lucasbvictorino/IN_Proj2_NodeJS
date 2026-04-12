import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ResetPasswordUseCase } from '../users/reset-password.js'

export function makeResetPassword() {
	const usersRepository = new PrismaUsersRepository()
	const resetPasswordUseCase = new ResetPasswordUseCase(usersRepository)

	return resetPasswordUseCase
}

