import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
        name: z.string().trim().min(1).max(100),
        password: z.string().trim().min(8).max(100),
        email: z.email().max(100),
    })

    const { name, password, email } = createUserBodySchema.parse(request.body)

    const user = await prisma.user.create({
        data: {
            name,
            passwordHash: password,
            email,
        }
    })

    return reply.status(201).send(user)
}