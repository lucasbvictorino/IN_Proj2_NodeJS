import { sendEmail } from '@/utils/send-email.js'

interface SendEmailUseCaseRequest {
  to: string
  subject: string
  message: string
}

export class SendEmailUseCase {
  async execute({ to, subject, message }: SendEmailUseCaseRequest) {
    await sendEmail({ to, subject, message })
  }
}
