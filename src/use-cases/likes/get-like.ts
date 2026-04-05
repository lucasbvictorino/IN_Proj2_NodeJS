import type { Like } from '@/@types/prisma/client.js'
import type { LikesRepository } from '@/repositories/likes-repository.js'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.js'

interface GetLikeUseCaseRequest {
  publicID: string
}

type GetLikeUseCaseResponse = {
  like: Like
}

export class GetLikeUseCase {
  constructor(private likesRepository: LikesRepository) {}
  async execute({
    publicID,
  }: GetLikeUseCaseRequest): Promise<GetLikeUseCaseResponse> {
    const like = await this.likesRepository.findBy({
      publicID,
    })

    if (!like) {
      throw new ResourceNotFoundError()
    }

    return { like }
  }
}
