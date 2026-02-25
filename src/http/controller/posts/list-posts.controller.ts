import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListPosts } from '@/use-cases/factories/make-list-posts.js'
import { PostPresenter } from '../presenters/post-presenter.js'

export async function listPosts(_request: FastifyRequest, reply: FastifyReply) {
    try {

        const listPostsUseCase = makeListPosts()
        const { posts } = await listPostsUseCase.execute()

        return reply.status(200).send({ posts: PostPresenter.toHTTP(posts) })
    } catch (error) {
        throw error
    }
}