import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { NotAllowedError } from '@/use-cases/errors/not-allowed-error.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'
import { makeDeletePost } from '@/use-cases/factories/make-delete-post.js'

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
  try {
    const deletePostParamsSchema = z.object({
      publicID: z.string(),
    })

    const { publicID } = deletePostParamsSchema.parse(request.params)
    const { sub: requesterPublicId } = request.user as { sub: string }

    const deletePostUseCase = makeDeletePost()

    await deletePostUseCase.execute({
      publicID,
      requesterPublicId,
    })

    return reply.status(200).send()
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
