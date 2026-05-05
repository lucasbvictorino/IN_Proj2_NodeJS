import type { FastifyReply, FastifyRequest } from 'fastify'
import { redis } from '@/libs/redis.js'
import { makeListPosts } from '@/use-cases/factories/make-list-posts.js'
import { PostPresenter } from '../presenters/post-presenter.js'

export async function listPosts(_request: FastifyRequest, reply: FastifyReply) {
  const cacheKey = 'posts:list'
  const cachedPosts = await redis.get(cacheKey)

  if (cachedPosts) {
    try {
      const posts = JSON.parse(cachedPosts)
      return reply.status(200).send({ posts })
    } catch {
      await redis.del(cacheKey)
    }
  }

  const listPostsUseCase = makeListPosts()
  const { posts } = await listPostsUseCase.execute()
  const presentedPosts = PostPresenter.toHTTP(posts)

  await redis.set(cacheKey, JSON.stringify(presentedPosts), 'EX', 300)

  return reply.status(200).send({ posts: presentedPosts })
}
