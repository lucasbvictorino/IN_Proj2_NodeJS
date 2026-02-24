import type { FastifyInstance } from "fastify";
import { createPost } from "./create-post.controller.js";

export async function postsRoutes(app: FastifyInstance) {
    app.post('/', createPost)
}