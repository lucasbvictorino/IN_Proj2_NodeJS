import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.js'
import { UserPresenter } from '../presenters/user-presenter.js'
import { makeListUsers } from '@/use-cases/factories/make-list-users.js'

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
    try {

        const listUsersUseCase = makeListUsers()

        const { users } = await listUsersUseCase.execute()

        return reply.status(200).send(UserPresenter.toHTTP(users))
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }
        throw error
    }
}