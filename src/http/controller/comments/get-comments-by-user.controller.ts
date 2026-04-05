import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeGetCommentsByUser } from '@/use-cases/factories/make-get-comments-by-user.js'
import { CommentPresenter } from '../presenters/comment-presenter.js'

export async function getCommentsByUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const paramsSchema = z.object({
      userPublicID: z.string(),
    })
    const { userPublicID } = paramsSchema.parse(request.params)

    const useCase = makeGetCommentsByUser()
    const { comments } = await useCase.execute({
      userPublicID,
    })

    return reply
      .status(200)
      .send({ comments: CommentPresenter.toHTTP(comments) })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
