import { SendEmailUseCase } from '../messaging/send-email.js'

export function makeSendEmail() {
  return new SendEmailUseCase()
}
