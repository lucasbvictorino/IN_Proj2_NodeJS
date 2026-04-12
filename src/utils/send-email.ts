import nodemailer from 'nodemailer'
import { env } from '@/env/index.js'

interface SendEmailParams {
  to: string
  subject: string
  message: string
}

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: {
    user: env.SMTP_EMAIL,
    pass: env.SMTP_PASSWORD,
  },
})

export async function sendEmail({ to, subject, message }: SendEmailParams) {
  await transporter.sendMail({
    from: env.SMTP_EMAIL,
    to,
    subject,
    text: message,
  })
}
