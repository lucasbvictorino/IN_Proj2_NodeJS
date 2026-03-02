import type { Like } from "@/@types/prisma/client.js"
import type { LikesRepository } from "@/repositories/likes-repository.js"
import type { UsersRepository } from "@/repositories/users-repository.js"
import type { PostsRepository } from "@/repositories/posts-repository.js"
import type { CommentsRepository } from "@/repositories/comments-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface CreateLikeUseCaseRequest {
    userPublicId: string
    postPublicId?: string
    commentPublicId?: string
}

type CreateLikeUseCaseResponse = {
    like: Like
}

export class CreateLikeUseCase {
    constructor(
        private likesRepository: LikesRepository,
        private usersRepository: UsersRepository,
        private postsRepository: PostsRepository,
        private commentsRepository: CommentsRepository,
    ) {}

    async execute({
        userPublicId,
        postPublicId,
        commentPublicId,
    }: CreateLikeUseCaseRequest): Promise<CreateLikeUseCaseResponse> {
        const user = await this.usersRepository.findBy({ publicID: userPublicId })

        if (!user) {
            throw new ResourceNotFoundError()
        }

        if (postPublicId) {
            const post = await this.postsRepository.findBy({ publicID: postPublicId })

            if (!post) {
                throw new ResourceNotFoundError()
            }

            const like = await this.likesRepository.create({
                userId: user.id,
                postId: post.id,
            })

            return { like }
        }

        const comment = await this.commentsRepository.findBy({ publicID: commentPublicId })

        if (!comment) {
            throw new ResourceNotFoundError()
        }

        const like = await this.likesRepository.create({
            userId: user.id,
            commentId: comment.id,
        })

        return { like }
    }
}
