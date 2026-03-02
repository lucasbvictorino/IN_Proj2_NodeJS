import { PrismaCommentsRepository } from "@/repositories/prisma/comments-prisma-repository.js"
import { CreateCommentUseCase } from "../comments/create-comment.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository.js"

export function makeCreateComment() {
    const userRepository = new PrismaUsersRepository()
    const postRepository = new PrismaPostsRepository()
    const commentRepository = new PrismaCommentsRepository()
    const createCommentUseCase = new CreateCommentUseCase(userRepository, postRepository, commentRepository)
    
    return createCommentUseCase
}