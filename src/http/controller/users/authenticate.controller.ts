import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error.js'
import { makeAuthenticateUsers } from '@/use-cases/factories/make-authenticate.js'
import type { TokenGenerator } from '@/use-cases/users/authenticate.js'
import { UserPresenter } from '../presenters/user-presenter.js'

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const authenticateUserBodySchema = z.object({
      password: z.string().trim().min(8).max(100),
      email: z.email().max(100),
    })

    const { password, email } = authenticateUserBodySchema.parse(request.body)

    const tokenGenerator: TokenGenerator = {
      generate: (payload) =>
        reply.jwtSign(payload, {
          expiresIn: '1d',
        }),
    }

    const authenticateUserUseCase = makeAuthenticateUsers(tokenGenerator)

    const { user, token } = await authenticateUserUseCase.execute({
      email,
      password,
    })

    return reply.status(201).send({ token, user: UserPresenter.toHTTP(user) })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
