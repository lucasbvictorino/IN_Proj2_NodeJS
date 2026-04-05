import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeGetUser } from '@/use-cases/factories/make-get-user.js'
import { UserPresenter } from '../presenters/user-presenter.js'

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { sub: publicID } = request.user as { sub: string }

    const getUserUseCase = makeGetUser()

    const { user } = await getUserUseCase.execute({
      publicID,
    })

    return reply.status(200).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserParamsSchema = z.object({
      publicID: z.string(),
    })

    const { publicID } = getUserParamsSchema.parse(request.params)

    const getUserUseCase = makeGetUser()

    const { user } = await getUserUseCase.execute({
      publicID,
    })

    return reply.status(200).send(UserPresenter.toHTTP(user))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
