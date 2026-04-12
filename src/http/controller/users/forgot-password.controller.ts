import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { forgotPasswordTextTemplate } from '@/templates/forgot-password/forgot-password-text.js'
import { UserNotFoundForPasswordResetError } from '@/use-cases/errors/user-not-found-for-password-reset-error.js'
import { makeForgotPassword } from '@/use-cases/factories/make-forgot-password.js'
import { makeSendEmail } from '@/use-cases/factories/make-send-email.js'

export async function forgotPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const forgotPasswordBodySchema = z.object({
      email: z.email().max(100),
    })

    const { email } = forgotPasswordBodySchema.parse(request.body)

    const forgotPasswordUseCase = makeForgotPassword()

    const { user, token } = await forgotPasswordUseCase.execute({ email })

    const sendEmailUseCase = makeSendEmail()

    await sendEmailUseCase.execute({
      to: user.email,
      subject: 'Recuperação de senha',
      message: forgotPasswordTextTemplate(user.name, token),
    })

    return reply.status(200).send({
      message: 'If the account exists, a password recovery email will be sent.',
    })
  } catch (error) {
    if (error instanceof UserNotFoundForPasswordResetError) {
      return reply.status(200).send({ message: error.message })
    }

    throw error
  }
}
