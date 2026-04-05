import type { Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'
import type { CommentsRepository } from '../comments-repository.js'

export class PrismaCommentsRepository implements CommentsRepository {
  async create(data: Prisma.CommentUncheckedCreateInput) {
    return await prisma.comment.create({ data })
  }

  async findBy(where: Prisma.CommentWhereInput) {
    return await prisma.comment.findFirst({ where })
  }

  async list() {
    return await prisma.comment.findMany()
  }

  async delete(id: number) {
    await prisma.comment.delete({
      where: { id },
    })
  }

  async update(id: number, data: Prisma.CommentUpdateInput) {
    return await prisma.comment.update({
      where: { id },
      data,
    })
  }

  async findByAuthorId(authorId: number) {
    return await prisma.comment.findMany({
      where: { authorId },
    })
  }

  async findByPostId(postId: number) {
    return await prisma.comment.findMany({
      where: { postId },
    })
  }
}
