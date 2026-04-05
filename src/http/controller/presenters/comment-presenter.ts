import type { Comment } from '@/@types/prisma/client.js'

type HTTPComment = {
  id: string
  content: string
}

export class CommentPresenter {
  static toHTTP(Comment: Comment): HTTPComment
  static toHTTP(Comments: Comment[]): HTTPComment[]
  static toHTTP(input: Comment | Comment[]): HTTPComment | HTTPComment[] {
    if (Array.isArray(input)) {
      return input.map((Comment) => CommentPresenter.toHTTP(Comment))
    }
    return {
      id: input.publicID,
      content: input.content,
    }
  }
}
