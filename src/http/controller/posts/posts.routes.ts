import type { FastifyInstance } from "fastify";
import { createPost } from "./create-post.controller.js";
import { listPosts } from "./list-posts.controller.js";
import { getPost } from "./get-post.controller.js";
import { updatePost } from "./update-post.controller.js";
import { deletePost } from "./delete-post.controller.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";

export async function postsRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJwt] }, createPost)
    app.get('/', listPosts)
    app.get('/:publicID', getPost)
    app.patch('/:publicID', { onRequest: [verifyJwt] }, updatePost)
    app.delete('/:publicID', { onRequest: [verifyJwt] }, deletePost)
}