import { z } from 'zod'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { PostPresenter } from '../presenters/post-presenter.js'
import { makeUpdatePost } from '@/use-cases/factories/make-update-post.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error.js'


export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
    try {
        const updatePostParamsSchema = z.object({
            publicID: z.string(),
        })

        const { publicID } = updatePostParamsSchema.parse(request.params)

        const updatePostBodySchema = z.object({
            title: z.string().trim().min(1).max(100).optional(),
            content: z.string().trim().min(1).max(2000).optional(),
        })

        const { title, content } = updatePostBodySchema.parse(request.body)

        const updatePostUseCase = makeUpdatePost()

        const {post} = await updatePostUseCase.execute({
            publicID,
            title,
            content,
        })

        return reply.status(200).send(PostPresenter.toHTTP(post))
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        throw error
    }
}