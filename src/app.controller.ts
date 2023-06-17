import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ResponseDto } from './common/dtos/response.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  wakeUp(): ResponseDto<object> {
    const response: ResponseDto<object> = this.appService.wakeUp();
    return response;
  }
}
