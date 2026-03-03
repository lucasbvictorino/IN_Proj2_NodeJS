import { makeGetCommentsByPost } from "@/use-cases/factories/make-get-comments-by-post.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { CommentPresenter } from "../presenters/comment-presenter.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";

export async function getCommentsByPost(
    request: FastifyRequest, reply: FastifyReply) {
        try {
            const paramsSchema = z.object({
                publicID: z.string()
            })
            const { publicID: postPublicID } = paramsSchema.parse(request.params)

            const useCase = makeGetCommentsByPost()
            const { comments } = await useCase.execute({
                postPublicID
            })
            
            return reply.status(200).send({ comments: CommentPresenter.toHTTP(comments) })
        } catch (error) {
            if (error instanceof ResourceNotFoundError) {
                return reply.status(404).send({ message: error.message })
            }
            throw error
        }

}
