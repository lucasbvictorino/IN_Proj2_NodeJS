import { GetPostUseCase } from "../posts/get-post.js";
import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository.js";

export function makeGetPost() {
    const postsRepository = new PrismaPostsRepository()
    const getPostUseCase = new GetPostUseCase(postsRepository)
    return getPostUseCase
}