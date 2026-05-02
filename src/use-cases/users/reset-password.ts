import { hash } from 'bcryptjs'
import type { User } from '@/@types/prisma/client.js'
import { env } from '@/env/index.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { InvalidTokenError } from '../errors/invalid-token-error.js'

interface ResetPasswordUseCaseRequest {
  token: string
  password: string
}

type ResetPasswordUseCaseResponse = {
  user: User
}

export class ResetPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    token,
    password,
  }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const user = await this.usersRepository.findBy({ token })

    if (!user?.tokenExpiresAt || user.tokenExpiresAt < new Date()) {
      throw new InvalidTokenError()
    }

    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const updatedUser = await this.usersRepository.update(user.id, {
      passwordHash,
      token: null,
      tokenExpiresAt: null,
    })

    return {
      user: updatedUser,
    }
  }
}
