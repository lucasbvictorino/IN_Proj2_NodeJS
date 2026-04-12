export class UserNotFoundForPasswordResetError extends Error {
  constructor() {
    super('If the account exists, a password recovery email will be sent.')
  }
}
