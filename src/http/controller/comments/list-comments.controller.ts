import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListComments } from '@/use-cases/factories/make-list-comments.js'
import { CommentPresenter } from '../presenters/comment-presenter.js'

export async function listComments(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const listCommentsUseCase = makeListComments()
  const { comments } = await listCommentsUseCase.execute()

  return reply.status(200).send({ comments: CommentPresenter.toHTTP(comments) })
}
