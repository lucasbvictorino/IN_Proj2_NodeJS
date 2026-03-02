import { PrismaCommentsRepository } from "@/repositories/prisma/comments-prisma-repository.js";
import { UpdateCommentUseCase } from "../comments/update-comment.js";

export function makeUpdateComment() {
    const commentsRepository = new PrismaCommentsRepository()
    const updateCommentUseCase = new UpdateCommentUseCase(commentsRepository)
    return updateCommentUseCase
}