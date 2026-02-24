import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserUseCase } from '@/use-cases/users/create-user.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.js'
import { th } from 'zod/locales'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const createUserBodySchema = z.object({
        name: z.string().trim().min(1).max(100),
        password: z.string().trim().min(8).max(100),
        email: z.email().max(100),
        })

        const { name, password, email } = createUserBodySchema.parse(request.body)

        const usersRepository = new PrismaUsersRepository()

        const {user} = await new CreateUserUseCase(usersRepository).execute({
            name,
            email,
            password,
        })

        return reply.status(201).send(user)
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }
}