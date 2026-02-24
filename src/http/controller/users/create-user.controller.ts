import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcryptjs'
import { env } from '@/env/index.js'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
        name: z.string().trim().min(1).max(100),
        password: z.string().trim().min(8).max(100),
        email: z.email().max(100),
    })

    const { name, password, email } = createUserBodySchema.parse(request.body)

    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const user = await prisma.user.create({
        data: {
            name,
            passwordHash,
            email,
        }
    })

    return reply.status(201).send(user)
}