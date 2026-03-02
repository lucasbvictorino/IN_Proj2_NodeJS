import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { LikePresenter } from '../presenters/like-presenter.js'
import { makeGetLike } from '@/use-cases/factories/make-get-like.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'


export async function getLike(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getLikeParamsSchema = z.object({
            publicID: z.string(),
        })

        const { publicID } = getLikeParamsSchema.parse(request.params)

        const getLikeUseCase = makeGetLike()

        const { like } = await getLikeUseCase.execute({
            publicID,
        })

        return reply.status(200).send(LikePresenter.toHTTP(like))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}