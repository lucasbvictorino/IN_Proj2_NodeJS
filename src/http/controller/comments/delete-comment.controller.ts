import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteComment } from '@/use-cases/factories/make-delete-comment.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'


export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
    try {
        const deleteCommentParamsSchema = z.object({
            publicID: z.string(),
        })

        const { publicID } = deleteCommentParamsSchema.parse(request.params)

        const deleteCommentUseCase = makeDeleteComment()

        await deleteCommentUseCase.execute({
            publicID,
        })

        return reply.status(200).send()
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error           
    }
}