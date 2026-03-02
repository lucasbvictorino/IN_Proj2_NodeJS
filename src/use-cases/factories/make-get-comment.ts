import { GetCommentUseCase } from "../comments/get-comment.js";
import { PrismaCommentsRepository } from "@/repositories/prisma/comments-prisma-repository.js";

export function makeGetComment() {
    const commentsRepository = new PrismaCommentsRepository()
    const getCommentUseCase = new GetCommentUseCase(commentsRepository)
    return getCommentUseCase
}