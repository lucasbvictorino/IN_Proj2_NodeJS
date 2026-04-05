import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeGetPostsByUser } from '@/use-cases/factories/make-get-posts-by-user.js'
import { PostPresenter } from '../presenters/post-presenter.js'

export async function getPostsByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      userPublicID: z.string(),
    })
    const { userPublicID } = paramsSchema.parse(request.params)

    const useCase = makeGetPostsByUser()
    const { posts } = await useCase.execute({
      userPublicID,
    })

    return reply.status(200).send({ posts: PostPresenter.toHTTP(posts) })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ error: error.message })
    }
    throw error
  }
}
