import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Response } from 'express';
import { ResponseDto, ResponseMessage } from 'src/Aplication/dtos';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const responseBody = new ResponseDto<object>(
      HttpStatus.TOO_MANY_REQUESTS,
      ResponseMessage.TOO_MANY_REQUESTS,
      {},
      [exception.message],
    );

    response.status(HttpStatus.TOO_MANY_REQUESTS).json(responseBody);
  }
}
