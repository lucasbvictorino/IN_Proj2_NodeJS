import { PrismaLikesRepository } from "@/repositories/prisma/likes-prisma-repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { DeleteLikeUseCase } from "../likes/delete-like.js";

export function makeDeleteLike() {
    const likesRepository = new PrismaLikesRepository()
    const usersRepository = new PrismaUsersRepository()
    const deleteLikeUseCase = new DeleteLikeUseCase(likesRepository, usersRepository)
    return deleteLikeUseCase
}