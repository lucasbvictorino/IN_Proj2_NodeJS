import { hash } from 'bcryptjs'
import { env } from '@/env/index.js'
import { prisma } from '@/libs/prisma.js'

export async function seed() {
  await prisma.user.upsert({
    where: {
      email: 'admin@example.com',
    },
    update: {},
    create: {
      publicId: '00000000-0000-0000-0000-000000000001',
      name: 'Admin',
      email: 'admin@example.com',
      role: 'ADMIN',
      passwordHash: await hash('12345678', env.HASH_SALT_ROUNDS),
    },
  })
  console.log('Database seeded successfully!')
}

seed()
  .then(() => {
    prisma.$disconnect()
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error seeding database:', error)
    prisma.$disconnect()
    process.exit(1)
  })
