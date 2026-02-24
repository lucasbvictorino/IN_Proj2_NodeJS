import type { Prisma } from "@/@types/prisma/client.js";
import type { UsersRepository } from "../users-repository.js";
import { prisma } from "@/libs/prisma.js";

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        return await prisma.user.create({ data })
    }

    async findByEmail(email: string) {
        return await prisma.user.findFirst({
            where: {
                email,
            }
        })
    }
    
    async findBy(where: Prisma.UserWhereInput) {
        return await prisma.user.findFirst({ where })
    }

    async list() {
        return await prisma.user.findMany()
    }

    async delete(id: number) {
        await prisma.user.delete({
            where: {id}
        })
    }

    async update(id: number, data: Prisma.UserUpdateInput) {
        return await prisma.user.update({
            where: {id},
            data,
        })
    }
}