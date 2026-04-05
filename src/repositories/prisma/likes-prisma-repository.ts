import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'
import type { LikesRepository } from '../likes-repository.js'

export class PrismaLikesRepository implements LikesRepository {
  async create(data: Prisma.LikeUncheckedCreateInput) {
    return await prisma.like.create({ data })
  }

  async findBy(where: Prisma.LikeWhereInput) {
    return await prisma.like.findFirst({ where })
  }

  async delete(id: number) {
    await prisma.like.delete({
      where: { id },
    })
  }

  async findByUserId(userId: number) {
    return await prisma.like.findMany({
      where: { userId },
    })
  }

  async findByPostId(postId: number) {
    return await prisma.like.findMany({
      where: { postId },
    })
  }

  async findByCommentId(commentId: number) {
    return await prisma.like.findMany({
      where: { commentId },
    })
  }
}
