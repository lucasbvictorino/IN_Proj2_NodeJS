import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteLike } from '@/use-cases/factories/make-delete-like.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { NotAllowedError } from '@/use-cases/errors/not-allowed-error.js'


export async function deleteLike(request: FastifyRequest, reply: FastifyReply) {
    try {
        const deleteLikeParamsSchema = z.object({
            publicID: z.string(),
        })

        const { publicID } = deleteLikeParamsSchema.parse(request.params)
        const { sub: requesterPublicId } = request.user as { sub: string }

        const deleteLikeUseCase = makeDeleteLike()

        await deleteLikeUseCase.execute({
            publicID,
            requesterPublicId,
        })

        return reply.status(200).send()
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        if (error instanceof NotAllowedError) {
            return reply.status(401).send({ message: error.message })
        }

        throw error           
    }
}