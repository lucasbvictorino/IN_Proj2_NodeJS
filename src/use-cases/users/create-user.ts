import type { User } from "@/@types/prisma/client.js"
import { prisma } from "@/libs/prisma.js"
import { hash } from "bcryptjs"
import { env } from "@/env/index.js"

interface CreateUserUseCaseRequest {
    name: string
    email: string
    password: string
}

type CreateUserUseCaseResponse = {
    user: User
}

export class CreateUserUseCase {
    async execute({
        name,
        email,
        password,
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const userWithSameEmail = await prisma.user.findFirst({
        where: {
            email,
        }  
    })
    if (userWithSameEmail) {
        throw new Error('This email is already in use.')
    }
    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const user = await prisma.user.create({
        data: {
            name,
            passwordHash,
            email,
        },
    })

    return {user}
    }
}