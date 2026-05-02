import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidTokenError } from '@/use-cases/errors/invalid-token-error.js'
import { makeResetPassword } from '@/use-cases/factories/make-reset-password.js'

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const resetPasswordBodySchema = z.object({
      token: z.string().min(1),
      password: z.string().trim().min(8).max(100),
    })

    const { token, password } = resetPasswordBodySchema.parse(request.body)

    const resetPasswordUseCase = makeResetPassword()

    await resetPasswordUseCase.execute({ token, password })

    return reply.status(200).send({ message: 'Password changed successfully.' })
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
