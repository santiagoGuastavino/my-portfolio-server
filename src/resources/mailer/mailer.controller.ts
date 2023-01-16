import {
  Controller,
  Post,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { HttpStatus } from '@nestjs/common/enums';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { SendEmailDto } from './dtos/send-email.dto';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  async sendEmail(@Body() payload: SendEmailDto): Promise<ResponseDto> {
    const response = new ResponseDto(HttpStatus.OK, 'Ok');
    const { name, email, message } = payload;
    const myEmail = 'smguastavino@gmail.com';

    try {
      const mailMeSubject = "You've been contacted";
      const mailMeHtml = `<span>from: </span><strong>${name}</strong><br><span>email: </span><strong>${email}</strong><br><p>${message}</p>`;

      const mailContactSubject = 'Thank you for reaching out';
      const mailContactHtml = `<p><strong>Thank you</strong> for contacting me, ${name}!</p><p>I'll get back to you in no time.</p><p>Best regards.</p><p>Santiago.</p>`;

      Logger.log('Sending emails', 'Mailer');
      await this.mailerService.sendEmail(myEmail, mailMeSubject, mailMeHtml);
      await this.mailerService.sendEmail(
        email,
        mailContactSubject,
        mailContactHtml,
      );

      Logger.log('Emails successfully sent', 'Mailer');
      response.payload = 'Both emails were successfully sent';

      return response;
    } catch (error) {
      Logger.error(error, 'Mailer');
      Logger.error("Emails couldn't be sent", 'Mailer');

      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        payload: {},
        errors: ["Emails couldn't be sent"],
      });
    }
    // if true
    //   ? Logger.log('The email was sent successfully')
    //   : Logger.error("The email couldn't be sent");
  }
}
