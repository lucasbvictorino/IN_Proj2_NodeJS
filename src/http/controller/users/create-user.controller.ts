import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.js'
import { makeCreateUser } from '@/use-cases/factories/make-create-user.js'
import { UserPresenter } from '../presenters/user-presenter.js'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const createUserBodySchema = z.object({
        name: z.string().trim().min(1).max(100),
        password: z.string().trim().min(8).max(100),
        email: z.email().max(100),
        })

        const { name, password, email } = createUserBodySchema.parse(request.body)

        const createUserUseCase = makeCreateUser()

        const {user} = await createUserUseCase.execute({
            name,
            email,
            password,
        })

        return reply.status(201).send(UserPresenter.toHTTP(user))
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }
}