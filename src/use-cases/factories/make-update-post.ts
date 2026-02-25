import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository.js";
import { UpdatePostUseCase } from "../posts/update-post.js";

export function makeUpdatePost() {
    const postsRepository = new PrismaPostsRepository()
    const updatePostUseCase = new UpdatePostUseCase(postsRepository)
    return updatePostUseCase
}