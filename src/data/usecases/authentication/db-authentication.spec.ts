import { type LoadAccountByEmailRepository } from 'data/protocols/load-account-by-email-repository'
import { type AccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

describe('DbAuthenticationUseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailStub implements LoadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        const account: AccountModel = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@email.com',
          password: 'any_password'
        }
        return new Promise(resolve => { resolve(account) })
      }
    }
    const loadAccountByEmailStub = new LoadAccountByEmailStub()
    const sut = new DbAuthentication(loadAccountByEmailStub)
    const loadAccountByEmailSpy = jest.spyOn(loadAccountByEmailStub, 'load')
    await sut.auth({
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(loadAccountByEmailSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
