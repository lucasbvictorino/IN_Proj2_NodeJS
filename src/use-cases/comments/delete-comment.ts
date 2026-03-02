import type { CommentsRepository } from "@/repositories/comments-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface DeleteCommentUseCaseRequest {
    publicID: string
}

export class DeleteCommentUseCase {
    constructor(private commentsRepository: CommentsRepository) {}
    async execute({
        publicID
    }: DeleteCommentUseCaseRequest) {
        const comment = await this.commentsRepository.findBy({
            publicID,
        })

        if (!comment) {
            throw new ResourceNotFoundError()
        }

        await this.commentsRepository.delete(comment.id)
    }
}