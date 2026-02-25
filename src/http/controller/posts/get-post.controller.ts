import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { PostPresenter } from '../presenters/post-presenter.js'
import { makeGetPost } from '@/use-cases/factories/make-get-post.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'


export async function getPost(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getPostParamsSchema = z.object({
            publicID: z.string(),
        })

        const { publicID } = getPostParamsSchema.parse(request.params)

        const getPostUseCase = makeGetPost()

        const {post} = await getPostUseCase.execute({
            publicID,
        })

        return reply.status(200).send(PostPresenter.toHTTP(post))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}