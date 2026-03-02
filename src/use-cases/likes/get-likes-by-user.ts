import type { Like } from "@/@types/prisma/client.js"
import type { LikesRepository } from "@/repositories/likes-repository.js"
import type { UsersRepository } from "@/repositories/users-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface GetLikesByUserUseCaseRequest {
    userPublicID: string
}

type GetLikesByUserUseCaseResponse = {
    likes: Like[]
}

export class GetLikesByUserUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private likesRepository: LikesRepository
    ) {}
    async execute({
        userPublicID,
    }: GetLikesByUserUseCaseRequest): Promise<GetLikesByUserUseCaseResponse> {
        const user = await this.usersRepository.findBy({
            publicID: userPublicID,
        })
        if (!user) {
            throw new ResourceNotFoundError()
        }

        const likes = await this.likesRepository.findByUserId(user.id)

        return { likes }
    }
}