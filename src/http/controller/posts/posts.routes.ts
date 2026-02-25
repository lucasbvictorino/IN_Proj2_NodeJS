import type { FastifyInstance } from "fastify";
import { createPost } from "./create-post.controller.js";
import { listPosts } from "./list-posts.controller.js";
import { getPost } from "./get-post.controller.js";
import { updatePost } from "./update-post.controller.js";
import { deletePost } from "./delete-post.controller.js";
import { getPostsByUser } from "./get-posts-by-user.controller.js";

export async function postsRoutes(app: FastifyInstance) {
    app.post('/', createPost)
    app.get('/', listPosts)
    app.get('/:publicID', getPost)
    app.patch('/:publicID', updatePost)
    app.delete('/:publicID', deletePost)
    app.get('/:publicID/posts', getPostsByUser)
}