import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { CommentPresenter } from '../presenters/comment-presenter.js'
import { makeUpdateComment } from '@/use-cases/factories/make-update-comment.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'


export async function updateComment(request: FastifyRequest, reply: FastifyReply) {
    try {
        const updateCommentParamsSchema = z.object({
            publicID: z.string(),
        })

        const { publicID } = updateCommentParamsSchema.parse(request.params)

        const updateCommentBodySchema = z.object({
            content: z.string().trim().min(1).max(2000),
        })

        const { content } = updateCommentBodySchema.parse(request.body)

        const updateCommentUseCase = makeUpdateComment()

        const { comment } = await updateCommentUseCase.execute({
            publicID,
            content,
        })

        return reply.status(200).send(CommentPresenter.toHTTP(comment))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}