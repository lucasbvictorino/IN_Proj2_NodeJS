import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'staging'])
    .default('development'),
  PORT: z.coerce.number().int().min(1024).max(65535).default(3333),
  HOST: z.string().default('0.0.0.0'),
  DATABASE_URL: z.string(),
  HASH_SALT_ROUNDS: z.coerce.number().int().min(1).default(10),
  JWT_SECRET: z.string(),
  SMTP_EMAIL: z.email(),
  SMTP_PASSWORD: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().min(1),
  SMTP_HOST: z.string().min(1),
  SMTP_SECURE: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
  FORGOT_PASSWORD_URL: z.url(),
  FORGOT_PASSWORD_EXPIRES_IN_MINUTES: z.coerce
    .number()
    .int()
    .min(1)
    .default(15),
  CRON_TEST: z.string().default('*/2 * * * *'),
  CRON_SCHEDULE: z.string().default('0 23 * * *'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables.', _env.error)
  throw new Error('Invalid environment variables')
}

export const env = _env.data
