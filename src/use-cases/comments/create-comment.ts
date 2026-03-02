import type { Comment } from "@/@types/prisma/client.js"
import type { CommentsRepository } from "@/repositories/comments-repository.js"
import type { UsersRepository } from "@/repositories/users-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"
import type { PostsRepository } from "@/repositories/posts-repository.js"

interface CreateCommentUseCaseRequest {
    content: string
    authorPublicId: string
    postPublicId: string
}

type CreateCommentUseCaseResponse = {
    comment: Comment
}

export class CreateCommentUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private postsRepository: PostsRepository,
        private commentsRepository: CommentsRepository,
    ) {}
    async execute({
        content,
        authorPublicId,
        postPublicId,
    }: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {

    const user = await this.usersRepository.findBy({ 
        publicID: authorPublicId 
    })

    if (!user) {
        throw new ResourceNotFoundError()
    }

    const post = await this.postsRepository.findBy({
        publicID: postPublicId
    })

    if (!post) {
        throw new ResourceNotFoundError()
    }

    const comment = await this.commentsRepository.create({
        content,
        authorId: user.id,
        postId: post.id,
    })

    return { comment }
    }
}