import type { FastifyInstance } from "fastify";
import { listComments } from "./list-comments.controller.js";

export async function commentsRoutes(app: FastifyInstance) {
    app.get('/', listComments)
}