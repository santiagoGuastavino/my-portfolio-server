import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, body } = request;

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;

      let log: string = `Request: ${method} ${originalUrl} - Response: ${statusMessage} ${statusCode}`;

      if (body && Object.keys(body).length > 0) {
        log = log + ` - Request body ${JSON.stringify(body)}`;
      }

      if (statusCode >= 400) {
        this.logger.error(log);
      } else {
        this.logger.log(log);
      }
    });

    next();
  }
}
