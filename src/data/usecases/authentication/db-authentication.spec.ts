import { type LoadAccountByEmailRepository } from 'data/protocols/load-account-by-email-repository'
import { type AccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'
import { type AuthenticationModel } from 'domain/usecases/authentication'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return new Promise(resolve => { resolve(makeFakeAccount()) })
    }
  }
  return new LoadAccountByEmailStub()
}

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@email.com',
  password: 'any_password'
})

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailStub)
  return {
    sut,
    loadAccountByEmailStub
  }
}

describe('DbAuthenticationUseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailStub } = makeSut()
    const loadAccountByEmailSpy = jest.spyOn(loadAccountByEmailStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadAccountByEmailSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
