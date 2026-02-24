import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserUseCase } from '@/use-cases/users/create-user.js'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
        name: z.string().trim().min(1).max(100),
        password: z.string().trim().min(8).max(100),
        email: z.email().max(100),
    })

    const { name, password, email } = createUserBodySchema.parse(request.body)

    const {user} = await new CreateUserUseCase().execute({
        name,
        email,
        password,
    })

    return reply.status(201).send(user)
}