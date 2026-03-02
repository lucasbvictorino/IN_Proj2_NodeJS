import type { Like } from "@/@types/prisma/client.js"
import type { LikesRepository } from "@/repositories/likes-repository.js"
import type { PostsRepository } from "@/repositories/posts-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface GetLikesByPostUseCaseRequest {
    postPublicID: string
}

type GetLikesByPostUseCaseResponse = {
    likes: Like[]
}

export class GetLikesByPostUseCase {
    constructor(
        private postsRepository: PostsRepository,
        private likesRepository: LikesRepository
    ) {}
    async execute({
        postPublicID,
    }: GetLikesByPostUseCaseRequest): Promise<GetLikesByPostUseCaseResponse> {
        const post = await this.postsRepository.findBy({
            publicID: postPublicID,
        })
        if (!post) {
            throw new ResourceNotFoundError()
        }

        const likes = await this.likesRepository.findByPostId(post.id)

        return { likes }
    }
}