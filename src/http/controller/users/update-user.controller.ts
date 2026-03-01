import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '../presenters/user-presenter.js'
import { makeUpdateUser } from '@/use-cases/factories/make-update-user.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'

export async function updateUserProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sub: publicID } = request.user as { sub: string }

        const updateUserBodySchema = z.object({
            name: z.string().trim().min(1).max(100).optional(),
            email: z.email().max(100).optional(),
        })

        const { name, email } = updateUserBodySchema.parse(request.body)

        const updateUserUseCase = makeUpdateUser()

        const {user} = await updateUserUseCase.execute({
            publicID,
            name,
            email,
        })

        return reply.status(200).send(UserPresenter.toHTTP(user))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const updateUserParamsSchema = z.object({
            publicID: z.string(),
        })

        const { publicID } = updateUserParamsSchema.parse(request.params)

        const updateUserBodySchema = z.object({
            name: z.string().trim().min(1).max(100).optional(),
            email: z.email().max(100).optional(),
        })

        const { name, email } = updateUserBodySchema.parse(request.body)

        const updateUserUseCase = makeUpdateUser()

        const {user} = await updateUserUseCase.execute({
            publicID,
            name,
            email,
        })

        return reply.status(200).send(UserPresenter.toHTTP(user))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}