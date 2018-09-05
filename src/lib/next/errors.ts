export class NotFoundPageError extends Error {
  code: string
  statusCode: number

  constructor(message?: string) {
    super(message)

    this.code = 'ENOENT'
    this.statusCode = 404
  }
}
