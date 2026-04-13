import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeGetLikesByUser } from '@/use-cases/factories/make-get-likes-by-user.js'
import { LikePresenter } from '../presenters/like-presenter.js'

export async function getLikesByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      userPublicId: z.string(),
    })
    const { userPublicId } = paramsSchema.parse(request.params)

    const useCase = makeGetLikesByUser()
    const { likes } = await useCase.execute({
      userPublicId,
    })

    return reply.status(200).send({ likes: LikePresenter.toHTTP(likes) })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
