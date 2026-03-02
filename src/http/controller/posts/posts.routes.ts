import type { FastifyInstance } from "fastify";
import { createPost } from "./create-post.controller.js";
import { listPosts } from "./list-posts.controller.js";
import { getPost } from "./get-post.controller.js";
import { updatePost } from "./update-post.controller.js";
import { deletePost } from "./delete-post.controller.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { createComment } from "../comments/create-comment.controller.js";
import { createPostLike } from "../likes/create-like.controller.js";
import { getCommentsByPost } from "../comments/get-comments-by-post.controller.js";
import { getLikesByPost } from "../likes/get-likes-by-post.controller.js";

export async function postsRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJwt] }, createPost)
    app.get('/', listPosts)
    app.get('/:publicID', getPost)
    app.patch('/:publicID', { onRequest: [verifyJwt] }, updatePost)
    app.delete('/:publicID', { onRequest: [verifyJwt] }, deletePost)

    //comments
    app.post('/:publicID/comments', { onRequest: [verifyJwt] }, createComment)
    app.get('/:publicID/comments', getCommentsByPost)

    //likes
    app.post('/:publicID/likes', { onRequest: [verifyJwt] }, createPostLike)
    app.get('/:publicID/likes', getLikesByPost)
}