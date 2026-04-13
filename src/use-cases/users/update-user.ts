import type { User } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface UpdateUserUseCaseRequest {
  publicId: string
  name?: string
  email?: string
}

type UpdateUserUseCaseResponse = {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    publicId,
    name,
    email,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userToUpdate = await this.usersRepository.findBy({
      publicId,
    })

    if (!userToUpdate) {
      throw new ResourceNotFoundError()
    }

    const user = await this.usersRepository.update(userToUpdate.id, {
      name,
      email,
    })

    return { user }
  }
}
