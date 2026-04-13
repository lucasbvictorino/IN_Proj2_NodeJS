import { app } from './app.js'
import { env } from './env/index.js'
import { startSendMostLikedPostsSummaryJob } from './jobs/send-most-liked-posts-summary.job.js'

app
  .listen({
    host: env.HOST,
    port: env.PORT,
  })
  .then(() => {
    startSendMostLikedPostsSummaryJob()

    const url = `https://localhost:${env.PORT}`
    console.log(`HTTP Server Running at ${url}`)
  })
