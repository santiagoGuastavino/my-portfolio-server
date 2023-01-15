import { Injectable, Logger } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { SendEmailDto } from './dtos/send-email.dto';

@Injectable()
export class MailerService {
  async sendEmail(payload: SendEmailDto): Promise<void> {
    const { name, email, message } = payload;
    const subject = "You've been contacted";

    const smtpTransport = await createTransport({
      port: Number(process.env.MAIL_PORT),
      from: process.env.MAIL_FROM,
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject,
      html: `
      <span>from: </span>
      <strong>${name}</strong>
      <br>
      <span>email: </span>
      <strong>${email}</strong>
      <br>
      <p>${message}</p>
      `,
    };

    Logger.log('Sending email');
    const result = await smtpTransport.sendMail(mailOptions);
    result
      ? Logger.log('The email was sent successfully')
      : Logger.error("The email couldn't be sent");
  }
}
