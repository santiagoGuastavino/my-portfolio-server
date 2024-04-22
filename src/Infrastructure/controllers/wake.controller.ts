import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ResponseDto } from 'src/Aplication/dtos';
import { WakeUseCase } from 'src/Aplication/use-cases';

@Controller('wake')
export class WakeController {
  constructor(private readonly wakeUseCase: WakeUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  wakeUp(): ResponseDto<object> {
    const response: ResponseDto<object> = this.wakeUseCase.wakeUp();
    return response;
  }
}
