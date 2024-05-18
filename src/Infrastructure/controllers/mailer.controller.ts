import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ResponseDto, SendEmailDto } from 'src/Aplication/dtos';
import { MailerUseCase } from 'src/Aplication/use-cases';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerUseCase: MailerUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 1, ttl: 86400000 } })
  @Post()
  async sendEmail(@Body() payload: SendEmailDto): Promise<ResponseDto<object>> {
    try {
      const response: ResponseDto<object> =
        await this.mailerUseCase.sendContactEmail(payload);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
