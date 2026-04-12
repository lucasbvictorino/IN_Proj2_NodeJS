import { randomBytes } from 'node:crypto'
import type { User } from '@/@types/prisma/client.js'
import { env } from '@/env/index.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserNotFoundForPasswordResetError } from '../errors/user-not-found-for-password-reset-error.js'

interface ForgotPasswordUseCaseRequest {
  email: string
}

type ForgotPasswordUseCaseResponse = {
  user: User
  token: string
}

const TOKEN_LENGTH = 32

export class ForgotPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFoundForPasswordResetError()
    }

    const token = randomBytes(TOKEN_LENGTH).toString('hex')
    const tokenExpiresAt = new Date(
      Date.now() + env.FORGOT_PASSWORD_EXPIRES_IN_MINUTES * 60 * 1000,
    )

    await this.usersRepository.update(user.id, {
      token,
      tokenExpiresAt,
    })

    return { user, token }
  }
}
