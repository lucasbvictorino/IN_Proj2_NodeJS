import { PrismaLikesRepository } from "@/repositories/prisma/likes-prisma-repository.js"
import { CreateLikeUseCase } from "../likes/create-like.js"
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js"
import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository.js"
import { PrismaCommentsRepository } from "@/repositories/prisma/comments-prisma-repository.js"

export function makeCreateLike() {
    const userRepository = new PrismaUsersRepository()
    const postRepository = new PrismaPostsRepository()
    const commentRepository = new PrismaCommentsRepository()
    const likeRepository = new PrismaLikesRepository()
    const createLikeUseCase = new CreateLikeUseCase(likeRepository, userRepository, postRepository, commentRepository)
    
    return createLikeUseCase
}