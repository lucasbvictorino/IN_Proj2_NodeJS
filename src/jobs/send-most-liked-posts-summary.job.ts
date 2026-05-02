import cron from 'node-cron'
import { env } from '@/env/index.js'
import { makeSendMostLikedPostsSummary } from '@/use-cases/factories/make-send-most-liked-posts-summary.js'

let task: ReturnType<typeof cron.schedule> | null = null

export function startSendMostLikedPostsSummaryJob() {
  if (task) {
    return task
  }

  const schedule = env.CRON_TEST

  console.log(`Daily highlights cron started with schedule: ${schedule}`)

  task = cron.schedule(schedule, async () => {
    try {
      const sendMostLikedPostsSummaryUseCase = makeSendMostLikedPostsSummary()

      const { sent, totalPosts } =
        await sendMostLikedPostsSummaryUseCase.execute()

      if (sent) {
        console.log(
          `Daily highlights email sent successfully with ${totalPosts} post(s).`,
        )
        return
      }

      console.log('No posts liked in the last 24 hours. Email skipped.')
    } catch (error) {
      console.error('Failed to run daily highlights job.', error)
    }
  })

  return task
}

export function stopSendMostLikedPostsSummaryJob() {
  if (!task) {
    return
  }

  task.stop()
  task = null
}
