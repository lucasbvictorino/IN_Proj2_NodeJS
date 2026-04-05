import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface DeleteUserUseCaseRequest {
  publicID: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ publicID }: DeleteUserUseCaseRequest) {
    const user = await this.usersRepository.findBy({
      publicID,
    })

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.usersRepository.delete(user.id)
  }
}
