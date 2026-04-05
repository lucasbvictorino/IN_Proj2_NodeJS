import type { Post, Prisma } from '@/@types/prisma/client.js'

export interface PostsRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
  findBy(where: Prisma.PostWhereInput): Promise<Post | null>
  list(): Promise<Post[]>
  delete(id: number): Promise<void>
  update(id: number, data: Prisma.PostUpdateInput): Promise<Post>
  findByAuthorId(authorId: number): Promise<Post[]>
}
