import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { NotAllowedError } from '@/use-cases/errors/not-allowed-error.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeUpdatePost } from '@/use-cases/factories/make-update-post.js'
import { PostPresenter } from '../presenters/post-presenter.js'

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
  try {
    const updatePostParamsSchema = z.object({
      publicID: z.string(),
    })

    const { publicID } = updatePostParamsSchema.parse(request.params)
    const { sub: requesterPublicId } = request.user as { sub: string }

    const updatePostBodySchema = z.object({
      title: z.string().trim().min(1).max(100).optional(),
      content: z.string().trim().min(1).max(2000).optional(),
    })

    const { title, content } = updatePostBodySchema.parse(request.body)

    const updatePostUseCase = makeUpdatePost()

    const { post } = await updatePostUseCase.execute({
      publicID,
      requesterPublicId,
      title,
      content,
    })

    return reply.status(200).send(PostPresenter.toHTTP(post))
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    if (error instanceof NotAllowedError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}
