import type { LikesRepository } from '@/repositories/likes-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { NotAllowedError } from '../errors/not-allowed-error.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface DeleteLikeUseCaseRequest {
  publicID: string
  requesterPublicId: string
}

export class DeleteLikeUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private usersRepository: UsersRepository,
  ) {}
  async execute({ publicID, requesterPublicId }: DeleteLikeUseCaseRequest) {
    const like = await this.likesRepository.findBy({ publicID })

    if (!like) {
      throw new ResourceNotFoundError()
    }

    const requester = await this.usersRepository.findBy({
      publicId: requesterPublicId,
    })

    if (requester?.id !== like.userId) {
      throw new NotAllowedError()
    }

    await this.likesRepository.delete(like.id)
  }
}
