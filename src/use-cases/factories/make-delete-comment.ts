import { PrismaCommentsRepository } from "@/repositories/prisma/comments-prisma-repository.js";
import { DeleteCommentUseCase } from "../comments/delete-comment.js";

export function makeDeleteComment() {
    const commentsRepository = new PrismaCommentsRepository()
    const deleteCommentUseCase = new DeleteCommentUseCase(commentsRepository)
    return deleteCommentUseCase
}