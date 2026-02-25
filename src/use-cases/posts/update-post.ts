import type { Post } from "@/@types/prisma/client.js"
import type { PostsRepository } from "@/repositories/posts-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface UpdatePostUseCaseRequest {
    publicID: string
    title?: string
    content?: string
}

type UpdatePostUseCaseResponse = {
    post: Post
}

export class UpdatePostUseCase {
    constructor(private postsRepository: PostsRepository) {}
    async execute({
        publicID,
        title,
        content,
    }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
        const postToUpdate = await this.postsRepository.findBy({
            publicID,
        })

    if (!postToUpdate) {
        throw new ResourceNotFoundError()
    }

    const post = await this.postsRepository.update(postToUpdate.id, {
        title,
        content,
    })

    return { post }
    }
}