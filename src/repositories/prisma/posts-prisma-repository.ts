import type { Post, Prisma } from '@/@types/prisma/client.js'
import { prisma } from '@/libs/prisma.js'
import type { PostsRepository } from '../posts-repository.js'

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
      where: { id },
    })
  }

  async update(id: number, data: Prisma.PostUpdateInput) {
    return await prisma.post.update({
      where: { id },
      data,
    })
  }

  async findMostLikedInLast24Hours(limit = 10) {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000)

    const groupedLikes = await prisma.like.groupBy({
      by: ['postId'],
      where: {
        postId: { not: null },
        createdAt: { gte: since },
      },
      _count: { postId: true },
      orderBy: { _count: { postId: 'desc' } },
      take: limit,
    })

    const postIds = groupedLikes
      .map((item) => item.postId)
      .filter((id): id is number => id !== null)

    if (postIds.length === 0) {
      return []
    }

    const posts = await prisma.post.findMany({
      where: {
        id: {
          in: postIds,
        },
      },
    })

    const postById = new Map<number, Post>(posts.map((post) => [post.id, post]))

    const postsByGroupedLikes = groupedLikes.map((item) => {
      if (item.postId === null) {
        return []
      }

      const post = postById.get(item.postId)

      if (!post) {
        return []
      }

      return [post]
    })

    const orderedPosts = postsByGroupedLikes.flat()

    return orderedPosts
  }
}
