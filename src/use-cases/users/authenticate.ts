import type { User } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error.js'

export interface HashComparer {
  compare(plain: string, hashed: string): Promise<boolean>
}

export interface TokenGenerator {
  generate(payload: { sub: string; role: User['role'] }): Promise<string>
}

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = {
  user: User
  token: string
}

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private tokenGenerator: TokenGenerator,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await this.hashComparer.compare(
      password,
      user.passwordHash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const token = await this.tokenGenerator.generate({
      sub: user.publicId,
      role: user.role,
    })

    return { user, token }
  }
}
