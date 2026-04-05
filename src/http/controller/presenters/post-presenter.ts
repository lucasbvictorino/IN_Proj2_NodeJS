import type { Post } from '@/@types/prisma/client.js'

type HTTPPost = {
  id: string
  title: string
  content: string
}

export class PostPresenter {
  static toHTTP(Post: Post): HTTPPost
  static toHTTP(Posts: Post[]): HTTPPost[]
  static toHTTP(input: Post | Post[]): HTTPPost | HTTPPost[] {
    if (Array.isArray(input)) {
      return input.map((post) => PostPresenter.toHTTP(post))
    }
    return {
      id: input.publicID,
      title: input.title,
      content: input.content,
    }
  }
}
