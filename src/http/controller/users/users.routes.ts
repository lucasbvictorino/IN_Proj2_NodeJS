import type { FastifyInstance } from "fastify";
import { createUser } from "./create-user.controller.js";

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', createUser)
}