import { MissingParamError } from '../../errors'
import { RequiredFieldsValidation } from './required-fields-validation'

describe('RequiredFieldValidation', () => {
  test('should return a MissinParamError if validation fails', () => {
    const sut = new RequiredFieldsValidation('any_field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('should not return a MissinParamError if validation success', () => {
    const sut = new RequiredFieldsValidation('any_field')
    const error = sut.validate({ any_field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
