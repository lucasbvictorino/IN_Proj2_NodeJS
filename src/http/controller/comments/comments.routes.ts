import type { FastifyInstance } from "fastify";
import { listComments } from "./list-comments.controller.js";
import { deleteComment } from "./delete-comment.controller.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { updateComment } from "./update-comment.controller.js";
import { getComment } from "./get-comment.controller.js";
import { createCommentLike } from "../likes/create-like.controller.js";

export async function commentsRoutes(app: FastifyInstance) {
    app.get('/', listComments)
    app.delete('/:publicID', { onRequest: [verifyJwt] }, deleteComment)
    app.patch('/:publicID', { onRequest: [verifyJwt] }, updateComment)
    app.get('/:publicID', { onRequest: [verifyJwt] }, getComment)

    // likes
    app.post('/:publicID/likes', { onRequest: [verifyJwt] }, createCommentLike)
}