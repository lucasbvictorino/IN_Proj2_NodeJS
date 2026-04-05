import { prisma } from './libs/prisma.js'

async function main() {
  try {
    const user = await prisma.user.create({
      data: {
        name: 'Lucas',
        passwordHash: 'aleatorio',
        email: 'lucas@email.com',
      },
    })
    console.log('Usuário criado com sucesso!')
    console.log(user)
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
