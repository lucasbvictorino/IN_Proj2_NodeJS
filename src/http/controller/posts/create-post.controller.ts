import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js";
import { makeCreatePost } from "@/use-cases/factories/make-create-post.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PostPresenter } from "../presenters/post-presenter.js";

export async function createPost(
    request: FastifyRequest, reply: FastifyReply) {
    try {
        const createPostBodySchema = z.object({
            title: z.string(),
            content: z.string(),
            authorPublicId: z.string(),
        })

        const { title, content, authorPublicId } = createPostBodySchema.parse(request.body)

        const createPostUseCase = makeCreatePost()

        const { post } = await createPostUseCase.execute({
            title,
            content,
            authorPublicId,
        })

        return reply.status(201).send({ post: PostPresenter.toHTTP(post) })

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }

}