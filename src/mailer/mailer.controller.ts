import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { SendEmailDto } from './dtos/send-email.dto';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  async sendEmail(@Body() payload: SendEmailDto): Promise<void> {
    return this.mailerService.sendEmail(payload);
  }
}
