import type { Comment, Prisma } from "@/@types/prisma/client.js"

export interface CommentsRepository {
    create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>
    findBy(where: Prisma.CommentWhereInput): Promise<Comment | null>
    list(): Promise<Comment[]>
    delete(id: number): Promise<void>
    update(id: number, data: Prisma.CommentUpdateInput): Promise<Comment>
    findByAuthorId(authorId: number): Promise<Comment[]>
    findByPostId(postId: number): Promise<Comment[]>
}