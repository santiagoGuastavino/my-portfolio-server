import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerController, WakeController } from './Infrastructure/controllers';
import { MailerUseCase, WakeUseCase } from './Aplication/use-cases';
import { LoggerMiddleware } from './Infrastructure/middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [WakeController, MailerController],
  providers: [WakeUseCase, MailerUseCase],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
