import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('any_field', 'any_field_to_compare')
}

describe('CompareFieldsValidation', () => {
  test('should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      any_field: 'any_value',
      any_field_to_compare: 'invalid_value'
    })
    expect(error).toEqual(new InvalidParamError('any_field_to_compare'))
  })

  test('should not return a MissinParamError if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({
      any_field: 'any_value',
      any_field_to_compare: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
