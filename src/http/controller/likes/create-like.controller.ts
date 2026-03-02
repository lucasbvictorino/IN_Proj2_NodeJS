import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeCreateLike } from "@/use-cases/factories/make-create-like.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { LikePresenter } from "../presenters/like-presenter.js";

const likeParamsSchema = z.object({
    publicID: z.string(),
})

export async function createPostLike(
    request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sub: userPublicId } = request.user as { sub: string }
        const { publicID: postPublicId } = likeParamsSchema.parse(request.params)

        const createLikeUseCase = makeCreateLike()

        const { like } = await createLikeUseCase.execute({
            userPublicId,
            postPublicId,
        })

        return reply.status(201).send({ like: LikePresenter.toHTTP(like) })

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}

export async function createCommentLike(
    request: FastifyRequest, reply: FastifyReply) {
    try {
        const { sub: userPublicId } = request.user as { sub: string }
        const { publicID: commentPublicId } = likeParamsSchema.parse(request.params)

        const createLikeUseCase = makeCreateLike()

        const { like } = await createLikeUseCase.execute({
            userPublicId,
            commentPublicId,
        })

        return reply.status(201).send({ like: LikePresenter.toHTTP(like) })

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}