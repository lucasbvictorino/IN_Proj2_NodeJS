import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { UpdateUserUseCase } from "../users/update-user.js";

export function makeUpdateUser() {
    const userRepository = new PrismaUsersRepository()
    const updateUserUseCase = new UpdateUserUseCase(userRepository)
    return updateUserUseCase
}