import type { Post } from "@/@types/prisma/client.js"
import type { PostsRepository } from "@/repositories/posts-repository.js"
import type { UsersRepository } from "@/repositories/users-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface CreatePostUseCaseRequest {
    title: string
    content: string
    authorPublicId: string
}

type CreatePostUseCaseResponse = {
    post: Post
}

export class CreatePostUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private postsRepository: PostsRepository
    ) {}
    async execute({
        title,
        content,
        authorPublicId,
    }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {

    const user = await this.usersRepository.findBy({ 
        publicID: authorPublicId 
    })

    if (!user) {
        throw new ResourceNotFoundError()
    }

    const post = await this.postsRepository.create({
        title,
        content,
        authorId: user.id,
    })

    return {post}
    }
}