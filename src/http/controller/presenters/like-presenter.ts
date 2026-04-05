import type { Like } from '@/@types/prisma/client.js'

type HTTPLike = {
  id: string
}

export class LikePresenter {
  static toHTTP(like: Like): HTTPLike
  static toHTTP(likes: Like[]): HTTPLike[]
  static toHTTP(input: Like | Like[]): HTTPLike | HTTPLike[] {
    if (Array.isArray(input)) {
      return input.map((like) => LikePresenter.toHTTP(like))
    }
    return {
      id: input.publicID,
    }
  }
}
