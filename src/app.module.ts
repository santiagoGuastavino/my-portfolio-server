import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MailerModule } from './mailer/mailer.module';

@Module({
  controllers: [AppController],
  imports: [ConfigModule.forRoot(), MailerModule],
})
export class AppModule {}
