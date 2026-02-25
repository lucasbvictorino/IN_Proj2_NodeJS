import type { FastifyInstance } from "fastify";
import { createUser } from "./create-user.controller.js";
import { getUser } from "./get-user.controller.js";
import { listUsers } from "./list-users.controller.js";
import { deleteUser } from "./delete-user.controller.js";
import { updateUser } from "./update-user.controller.js";
import { getPostsByUser } from "../posts/get-posts-by-user.controller.js";

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', createUser)
    app.get('/:publicID', getUser)
    app.get('/', listUsers)
    app.delete('/:publicID', deleteUser)
    app.patch('/:publicID', updateUser)
    app.get('/:userPublicID/posts', getPostsByUser)
}