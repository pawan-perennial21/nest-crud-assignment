import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';


@Module({
  providers: [LoggerService], // Add LoggerService to the providers
  exports: [LoggerService], // Export LoggerService to make it available in other modules
})
export class LoggerModule {}
