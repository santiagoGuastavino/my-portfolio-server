import { Module } from '@nestjs/common';
import { MailerUseCase } from './mailer.use-case';

@Module({
  providers: [MailerUseCase],
  exports: [MailerUseCase],
})
export class MailerUseCaseModule {}
