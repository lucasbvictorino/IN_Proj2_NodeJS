import { makeGetLikesByComment } from "@/use-cases/factories/make-get-likes-by-comment.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { LikePresenter } from "../presenters/like-presenter.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";

export async function getLikesByComment(
    request: FastifyRequest, reply: FastifyReply) {
        try {
            const paramsSchema = z.object({
                publicID: z.string()
            })
            const { publicID: commentPublicID } = paramsSchema.parse(request.params)

            const useCase = makeGetLikesByComment()
            const { likes } = await useCase.execute({
                commentPublicID
            })
            
            return reply.status(200).send({ likes: LikePresenter.toHTTP(likes) })
        } catch (error) {
            if (error instanceof ResourceNotFoundError) {
                return reply.status(404).send({ message: error.message })
            }
            throw error
        }

}
