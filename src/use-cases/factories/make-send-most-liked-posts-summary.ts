import { SendMostLikedPostsSummaryUseCase } from '../posts/send-most-liked-posts-summary.js'
import { makeGetMostLikedPostsInLast24Hours } from './make-get-most-liked-posts-in-last-24-hours.js'
import { makeSendEmail } from './make-send-email.js'

export function makeSendMostLikedPostsSummary() {
  const getMostLikedPostsInLast24HoursUseCase =
    makeGetMostLikedPostsInLast24Hours()
  const sendEmailUseCase = makeSendEmail()

  const sendMostLikedPostsSummaryUseCase = new SendMostLikedPostsSummaryUseCase(
    getMostLikedPostsInLast24HoursUseCase,
    sendEmailUseCase,
  )

  return sendMostLikedPostsSummaryUseCase
}
