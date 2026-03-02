import type { FastifyInstance } from "fastify";
import { createUser } from "./create-user.controller.js";
import { getUser, getUserProfile } from "./get-user.controller.js";
import { listUsers } from "./list-users.controller.js";
import { deleteUser, deleteUserProfile } from "./delete-user.controller.js";
import { updateUser, updateUserProfile } from "./update-user.controller.js";
import { getPostsByUser } from "../posts/get-posts-by-user.controller.js";
import { authenticateUser } from "./authenticate.controller.js";
import { verifyUserRole } from "@/http/middlewares/verify-user-role.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', createUser)
    app.post('/authenticate', authenticateUser)

    app.get('/:publicID', getUser)
    app.get('/', listUsers)
    // app.get('/', listUsers)
    app.delete('/:publicID', { onRequest: [verifyJwt, verifyUserRole(['ADMIN'])] }, deleteUser)
    app.patch('/:publicID', { onRequest: [verifyJwt, verifyUserRole(['ADMIN'])] }, updateUser)
    app.get('/:userPublicID/posts', getPostsByUser)

    // USER PROFILE ROUTES
    app.get('/me', { onRequest: [verifyJwt] }, getUserProfile)
    app.patch('/me', { onRequest: [verifyJwt] }, updateUserProfile)
    app.delete('/me', { onRequest: [verifyJwt] }, deleteUserProfile)
}