import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { redis } from '@/libs/redis.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeGetPostsByUser } from '@/use-cases/factories/make-get-posts-by-user.js'
import { PostPresenter } from '../presenters/post-presenter.js'

export async function getPostsByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      userPublicId: z.string(),
    })
    const { userPublicId } = paramsSchema.parse(request.params)

    const cacheKey = `posts:listByUser:${userPublicId}`
    const cachedPosts = await redis.get(cacheKey)

    if (cachedPosts) {
      try {
        const posts = JSON.parse(cachedPosts)
        return reply.status(200).send({ posts })
      } catch {
        await redis.del(cacheKey)
      }
    }

    const useCase = makeGetPostsByUser()
    const { posts } = await useCase.execute({
      userPublicId,
    })

    const presentedPosts = PostPresenter.toHTTP(posts)

    await redis.set(cacheKey, JSON.stringify(presentedPosts), 'EX', 300)

    return reply.status(200).send({ posts: presentedPosts })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ error: error.message })
    }
    throw error
  }
}
