export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missim param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
