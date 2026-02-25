
import { PrismaPostsRepository } from "@/repositories/prisma/posts-prisma-repository.js";
import { ListPostUseCase } from "../posts/list-posts.js";

export function makeListPosts() {
    const postsRepository = new PrismaPostsRepository()
    const listPostsUseCase = new ListPostUseCase(postsRepository)
    return listPostsUseCase
}