import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { GetPostsByUserUseCase } from "../posts/get-posts-by-user.js";

export function makeGetPostsByUser() {
    const usersRepository = new PrismaUsersRepository()
    const postsRepository = new PrismaPostsRepository()
    const getPostsByUserUseCase = new GetPostsByUserUseCase(
        usersRepository, postsRepository
    )
    return getPostsByUserUseCase
}