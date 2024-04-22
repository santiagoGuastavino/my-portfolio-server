import { Module } from '@nestjs/common';
import { WakeUseCase } from './wake.use-case';

@Module({
  providers: [WakeUseCase],
  exports: [WakeUseCase],
})
export class WakeUseCaseModule {}
