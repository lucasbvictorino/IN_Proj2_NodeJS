import type { Prisma } from "@/@types/prisma/client.js"
import type { PostsRepository } from "../posts-repository.js"
import { prisma } from "@/libs/prisma.js"

export class PrismaPostsRepository implements PostsRepository {
    async create(data: Prisma.PostUncheckedCreateInput) {
        return await prisma.post.create({ data })
    }

    async findBy(where: Prisma.PostWhereInput) {
        return await prisma.post.findFirst({ where })
    }

    async list() {
        return await prisma.post.findMany()
    }

    async findByAuthorId(authorId: number) {
        return await prisma.post.findMany({
            where: { authorId },
        })
    }

    async delete(id: number) {
        await prisma.post.delete({
            where: {id}
        })
    }

    async update(id: number, data: Prisma.PostUpdateInput) {
        return await prisma.post.update({
            where: {id},
            data,
        })
    }
}