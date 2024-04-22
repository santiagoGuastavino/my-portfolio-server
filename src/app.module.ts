import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerController, WakeController } from './Infrastructure/controllers';
import { MailerUseCase, WakeUseCase } from './Aplication/use-cases';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [WakeController, MailerController],
  providers: [WakeUseCase, MailerUseCase],
})
export class AppModule {}
