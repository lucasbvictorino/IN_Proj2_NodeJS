
import { PrismaCommentsRepository } from "@/repositories/prisma/comments-prisma-repository.js";
import { ListCommentUseCase } from "../comments/list-comments.js";

export function makeListComments() {
    const commentsRepository = new PrismaCommentsRepository()
    const listCommentsUseCase = new ListCommentUseCase(commentsRepository)
    return listCommentsUseCase
}