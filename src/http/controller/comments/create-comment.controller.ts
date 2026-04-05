import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeCreateComment } from '@/use-cases/factories/make-create-comment.js'
import { CommentPresenter } from '../presenters/comment-presenter.js'

export async function createComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { sub: authorPublicId } = request.user as { sub: string }

    const createCommentParamsSchema = z.object({
      publicID: z.string(),
    })

    const { publicID: postPublicId } = createCommentParamsSchema.parse(
      request.params,
    )

    const createCommentBodySchema = z.object({
      content: z.string(),
    })

    const { content } = createCommentBodySchema.parse(request.body)

    const createCommentUseCase = makeCreateComment()

    const { comment } = await createCommentUseCase.execute({
      content,
      authorPublicId,
      postPublicId,
    })

    return reply.status(201).send({ comment: CommentPresenter.toHTTP(comment) })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
