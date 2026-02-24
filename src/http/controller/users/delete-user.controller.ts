import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteUser } from '@/use-cases/factories/make-delete-user.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'


export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const deleteUserParamsSchema = z.object({
            publicID: z.string(),
        })

        const { publicID } = deleteUserParamsSchema.parse(request.params)

        const deleteUserUseCase = makeDeleteUser()

        await deleteUserUseCase.execute({
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