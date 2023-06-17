import { Controller, Post, HttpCode } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { SendEmailDto } from './dtos/send-email.dto';
import { MailerService } from './mailer.service';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async sendEmail(@Body() payload: SendEmailDto): Promise<ResponseDto<object>> {
    try {
      const response: ResponseDto<object> =
        await this.mailerService.sendContactEmail(payload);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
