import type { FastifyInstance } from 'fastify'
import { commentsRoutes } from './comments/comments.routes.js'
import { likesRoutes } from './likes/likes.routes.js'
import { postsRoutes } from './posts/posts.routes.js'
import { usersRoutes } from './users/users.routes.js'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/users' })
  app.register(postsRoutes, { prefix: '/posts' })
  app.register(commentsRoutes, { prefix: '/comments' })
  app.register(likesRoutes, { prefix: '/likes' })
}
