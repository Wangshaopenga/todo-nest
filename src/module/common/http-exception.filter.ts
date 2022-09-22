import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const errors = exception.getResponse()
    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: (typeof errors === 'string') ? errors : (errors as any).message,
      })
  }
}
