import { env } from '@/env/index.js'

export function forgotPasswordTextTemplate(userName: string, token: string) {
  const url = `${env.FORGOT_PASSWORD_URL}?token=${token}`

  return [
    `Olá, ${userName}!`,
    '',
    'Recebemos uma solicitação para redefinir a sua senha. Para continuar, acesse o link abaixo:',
    '',
    url,
    '',
    'Se você não solicitou a recuperação de senha, ignore este e-mail.',
  ].join('\n')
}
