import type { Comment } from "@/@types/prisma/client.js"
import type { CommentsRepository } from "@/repositories/comments-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface UpdateCommentUseCaseRequest {
    publicID: string
    content: string
}

type UpdateCommentUseCaseResponse = {
    comment: Comment
}

export class UpdateCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) {}
    async execute({
        publicID,
        content,
    }: UpdateCommentUseCaseRequest): Promise<UpdateCommentUseCaseResponse> {
        const CommentToUpdate = await this.commentsRepository.findBy({
            publicID,
        })

    if (!CommentToUpdate) {
        throw new ResourceNotFoundError()
    }

    const comment = await this.commentsRepository.update(CommentToUpdate.id, {
        content,
    })

    return { comment }
    }
}