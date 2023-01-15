import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @HttpCode(HttpStatus.OK)
  wake(): void {
    Logger.log('Server ready to accept requests');
    return;
  }
}
