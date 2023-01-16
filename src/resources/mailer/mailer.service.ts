import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailerService {
  async sendEmail(email: string, subject: string, html: string): Promise<void> {
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
      from: `"Santiago Guastavino"<${process.env.MAIL_FROM}>`,
      to: email,
      subject,
      html,
    };

    await smtpTransport.sendMail(mailOptions);
    return;
  }
}
