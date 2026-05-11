import { describe, expect, it, vi } from 'vitest'
import type { User } from '../../../@types/prisma/client.js'
import { USER_ROLE } from '../../../@types/prisma/enums.js'
import type { UsersRepository } from '../../../repositories/users-repository.js'
import { AuthenticateUserUseCase, type HashComparer, type TokenGenerator } from '../authenticate.js'

describe('AuthenticateUserUseCase', () => {
	it('deve retornar um token quando o email e a senha estiverem corretos', async () => {
		const user: User = {
			id: 1,
			publicId: 'user-1',
			name: 'Sleepy Joe',
			email: 'sjoe@example.com',
			passwordHash: 'hashed-password',
			token: null,
			tokenExpiresAt: null,
			profilePicture: null,
			role: USER_ROLE.DEFAULT,
		}

		const usersRepository = {
			create: vi.fn(),
			findByEmail: vi.fn().mockResolvedValue(user),
			findBy: vi.fn(),
			list: vi.fn(),
			delete: vi.fn(),
			update: vi.fn(),
		} as UsersRepository

		const hashComparer: HashComparer = {
			compare: vi.fn().mockResolvedValue(true),
		}

		const tokenGenerator: TokenGenerator = {
			generate: vi.fn().mockResolvedValue('token-falso-123'),
		}

		const useCase = new AuthenticateUserUseCase(
			usersRepository,
			hashComparer,
			tokenGenerator,
		)

		const result = await useCase.execute({
			email: 'sjoe@example.com',
			password: '12345678',
		})

		expect(result.token).toEqual('token-falso-123')
		expect(usersRepository.findByEmail).toHaveBeenCalledWith('sjoe@example.com')
		expect(hashComparer.compare).toHaveBeenCalledWith(
			'12345678',
			user.passwordHash,
		)
	})
})
