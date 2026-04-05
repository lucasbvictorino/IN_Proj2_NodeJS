import { hash } from 'bcryptjs'
import type { User } from '@/@types/prisma/client.js'
import { env } from '@/env/index.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserAlreadyExistsError } from '../errors/user-already-exists.js'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    })

    return { user }
  }
}
