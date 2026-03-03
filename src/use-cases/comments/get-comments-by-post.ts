import type { Comment } from "@/@types/prisma/client.js"
import type { CommentsRepository } from "@/repositories/comments-repository.js"
import type { PostsRepository } from "@/repositories/posts-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface GetCommentsByPostUseCaseRequest {
    postPublicID: string
}

type GetCommentsByPostUseCaseResponse = {
    comments: Comment[]
}

export class GetCommentsByPostUseCase {
    constructor(
        private postsRepository: PostsRepository,
        private commentsRepository: CommentsRepository
    ) {}
    async execute({
        postPublicID,
    }: GetCommentsByPostUseCaseRequest): Promise<GetCommentsByPostUseCaseResponse> {
        const Post = await this.postsRepository.findBy({
            publicID: postPublicID,
        })
        if (!Post) {
            throw new ResourceNotFoundError()
        }

        const comments = await this.commentsRepository.findByPostId(Post.id)

        return { comments }
    }
}