import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { createTransport } from 'nodemailer';
import {
  ResponseDto,
  ResponseMessage,
  SendEmailDto,
} from 'src/Aplication/dtos';

interface MailData {
  from: string;
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class MailerUseCase {
  public async sendContactEmail(
    payload: SendEmailDto,
  ): Promise<ResponseDto<object>> {
    try {
      const response = new ResponseDto<object>(
        HttpStatus.OK,
        ResponseMessage.OK,
      );

      const { name, email, message } = payload;

      const mailMe: MailData = {
        from: 'PORTFOLIO PROJECT',
        to: 'smguastavino@gmail.com',
        subject: 'The portfolio form has been submitted',
        html: `<span>from: </span><strong>${name}</strong><br><span>email: </span><strong>${email}</strong><br><p>${message}</p>`,
      };

      const mailThem: MailData = {
        from: 'Santiago Guastavino',
        to: email,
        subject: 'Thank you for reaching out',
        html: `<p><strong>Thank you</strong> for contacting me, ${name}!</p><p>I'll get back to you as soon as I can.</p><p>Best regards.</p><p>Santiago.</p>`,
      };

      await this.sendEmail(mailMe);
      await this.sendEmail(mailThem);

      return response;
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        payload: {},
        errors: ["Emails couldn't be sent"],
      });
    }
  }

  private async sendEmail(mailData: MailData): Promise<void> {
    const smtpTransport = await createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `${mailData.from}<${process.env.MAIL_FROM}>`,
      to: mailData.to.toLocaleLowerCase(),
      subject: mailData.subject,
      html: mailData.html,
    };

    await smtpTransport.sendMail(mailOptions);
  }
}
