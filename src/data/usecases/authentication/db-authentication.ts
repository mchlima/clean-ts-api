import { type LoadAccountByEmailRepository } from 'data/protocols/db/load-account-by-email-repository'
import { type AuthenticationModel, type Authentication } from '../../../domain/usecases/authentication'
import { type HashComparer } from 'data/protocols/criptography/hash-comparer'
import { type AccountModel } from '../add-account/db-add-account-protocols'
import { type TokenGenerator } from 'data/protocols/criptography/token-generator'

type NewType = LoadAccountByEmailRepository

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator

  constructor (
    loadAccountByEmailRepository: NewType,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account: AccountModel = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken: string = await this.tokenGenerator.generate(account.id)
        return accessToken
      }
    }
    return null
  }
}
