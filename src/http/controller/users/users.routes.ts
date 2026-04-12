import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { verifyUserRole } from '@/http/middlewares/verify-user-role.js'
import { getCommentsByUser } from '../comments/get-comments-by-user.controller.js'
import { getLikesByUser } from '../likes/get-likes-by-user.controller.js'
import { getPostsByUser } from '../posts/get-posts-by-user.controller.js'
import { authenticateUser } from './authenticate.controller.js'
import { createUser } from './create-user.controller.js'
import { deleteUser, deleteUserProfile } from './delete-user.controller.js'
import { forgotPassword } from './forgot-password.controller.js'
import { getUser, getUserProfile } from './get-user.controller.js'
import { listUsers } from './list-users.controller.js'
import { resetPassword } from './reset-password.controller.js'
import { updateUser, updateUserProfile } from './update-user.controller.js'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', createUser)
  app.post('/authenticate', authenticateUser)
  app.post('/forgotPassword', forgotPassword)
  app.post('/resetPassword', resetPassword)

  app.get('/:publicId', getUser)
  app.get('/', listUsers)
  app.delete(
    '/:publicId',
    { onRequest: [verifyJwt, verifyUserRole(['ADMIN'])] },
    deleteUser,
  )
  app.patch(
    '/:publicId',
    { onRequest: [verifyJwt, verifyUserRole(['ADMIN'])] },
    updateUser,
  )

  app.get('/:userPublicId/posts', getPostsByUser)
  app.get('/:userPublicId/comments', getCommentsByUser)
  app.get('/:userPublicId/likes', getLikesByUser)

  // USER PROFILE ROUTES
  app.get('/me', { onRequest: [verifyJwt] }, getUserProfile)
  app.patch('/me', { onRequest: [verifyJwt] }, updateUserProfile)
  app.delete('/me', { onRequest: [verifyJwt] }, deleteUserProfile)
}
