import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;

    response.on('finish', () => {
      const { statusCode } = response;

      if (statusCode >= 400) {
        this.logger.error(
          `Request: ${method} ${originalUrl} - Response status: ${statusCode}`,
        );
      } else {
        this.logger.log(
          `Request: ${method} ${originalUrl} - Response status: ${statusCode}`,
        );
      }
    });

    next();
  }
}
