import { makeGetLikesByUser } from "@/use-cases/factories/make-get-likes-by-user.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { LikePresenter } from "../presenters/like-presenter.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";

export async function getLikesByUser(
    request: FastifyRequest, reply: FastifyReply) {
        try {
            const paramsSchema = z.object({
                userPublicID: z.string()
            })
            const { userPublicID } = paramsSchema.parse(request.params)

            const useCase = makeGetLikesByUser()
            const { likes } = await useCase.execute({
                userPublicID
            })
            
            return reply.status(200).send({ likes: LikePresenter.toHTTP(likes) })
        } catch (error) {
            if (error instanceof ResourceNotFoundError) {
                return reply.status(404).send({ message: error.message })
            }
            throw error
        }

}
