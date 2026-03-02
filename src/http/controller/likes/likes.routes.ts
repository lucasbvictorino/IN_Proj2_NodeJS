import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import type { FastifyInstance } from "fastify";
import { deleteLike } from "./delete-like.controller.js";
import { getLike } from "./get-like.controller.js";

export async function likesRoutes(app: FastifyInstance) {
    app.delete('/:publicID', { onRequest: [verifyJwt] }, deleteLike)
    app.get('/:publicID', getLike)
}