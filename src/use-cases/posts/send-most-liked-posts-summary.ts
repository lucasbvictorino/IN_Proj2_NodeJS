import { env } from '@/env/index.js'
import type { SendEmailUseCase } from '../messaging/send-email.js'
import type { GetMostLikedPostsInLast24HoursUseCase } from './get-most-liked-posts-in-last-24-hours.js'

interface SendMostLikedPostsSummaryUseCaseRequest {
  to?: string
  limit?: number
}

type SendMostLikedPostsSummaryUseCaseResponse = {
  sent: boolean
  totalPosts: number
}

export class SendMostLikedPostsSummaryUseCase {
  constructor(
    private getMostLikedPostsInLast24HoursUseCase: GetMostLikedPostsInLast24HoursUseCase,
    private sendEmailUseCase: SendEmailUseCase,
  ) {}

  async execute({
    to = env.SMTP_EMAIL,
    limit,
  }: SendMostLikedPostsSummaryUseCaseRequest = {}): Promise<SendMostLikedPostsSummaryUseCaseResponse> {
    const { posts } = await this.getMostLikedPostsInLast24HoursUseCase.execute({
      limit,
    })

    if (posts.length === 0) {
      return {
        sent: false,
        totalPosts: 0,
      }
    }

    const message = [
      'Resumo diário - posts mais curtidos nas últimas 24 horas:',
      '',
      ...posts.map(
        (post, index) =>
          `${index + 1}. ${post.title} (publicId: ${post.publicID})`,
      ),
    ].join('\n')

    await this.sendEmailUseCase.execute({
      to,
      subject: 'Resumo diário de posts mais curtidos',
      message,
    })

    return {
      sent: true,
      totalPosts: posts.length,
    }
  }
}
