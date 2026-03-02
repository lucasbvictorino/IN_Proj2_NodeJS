import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { CommentPresenter } from '../presenters/comment-presenter.js'
import { makeGetComment } from '@/use-cases/factories/make-get-comment.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'


export async function getComment(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getCommentParamsSchema = z.object({
            publicID: z.string(),
        })

        const { publicID } = getCommentParamsSchema.parse(request.params)

        const getCommentUseCase = makeGetComment()

        const { comment } = await getCommentUseCase.execute({
            publicID,
        })

        return reply.status(200).send(CommentPresenter.toHTTP(comment))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}