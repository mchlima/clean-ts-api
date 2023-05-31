import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { type HttpRequest, type Controller, type HttpResponse, type EmailValidator } from '../../protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const { email } = httpRequest.body
    const isValidEmail = this.emailValidator.isValid(email)
    if (!isValidEmail) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
