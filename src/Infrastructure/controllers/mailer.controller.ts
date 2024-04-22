import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ResponseDto, SendEmailDto } from 'src/Aplication/dtos';
import { MailerUseCase } from 'src/Aplication/use-cases';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerUseCase: MailerUseCase) {}

  @HttpCode(HttpStatus.OK)
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
