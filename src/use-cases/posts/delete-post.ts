import type { PostsRepository } from "@/repositories/posts-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface DeletePostUseCaseRequest {
    publicID: string
}

export class DeletePostUseCase {
    constructor(private postsRepository: PostsRepository) {}
    async execute({
        publicID
    }: DeletePostUseCaseRequest) {
        const post = await this.postsRepository.findBy({
            publicID,
        })

        if (!post) {
            throw new ResourceNotFoundError()
        }

        await this.postsRepository.delete(post.id)
    }
}