import type { Like, Prisma } from '@/@types/prisma/client.js'

export interface LikesRepository {
  create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>
  findBy(where: Prisma.LikeWhereInput): Promise<Like | null>
  delete(id: number): Promise<void>
  findByUserId(userId: number): Promise<Like[]>
  findByPostId(postId: number): Promise<Like[]>
  findByCommentId(commentId: number): Promise<Like[]>
  findTopLikedInLast24Hours(): Promise<Like[]>
}
