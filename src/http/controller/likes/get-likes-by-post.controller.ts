import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeGetLikesByPost } from '@/use-cases/factories/make-get-likes-by-post.js'
import { LikePresenter } from '../presenters/like-presenter.js'

export async function getLikesByPost(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      publicID: z.string(),
    })
    const { publicID: postPublicID } = paramsSchema.parse(request.params)

    const useCase = makeGetLikesByPost()
    const { likes } = await useCase.execute({
      postPublicID,
    })

    return reply.status(200).send({ likes: LikePresenter.toHTTP(likes) })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
