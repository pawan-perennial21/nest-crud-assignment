import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService, configFactory } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      // If you want to use a different environment (e.g., 'production', 'development', etc.), you can set it here.
      // envFilePath: ['.env.production', '.env.development', '.env'],
    }),
  ],
  providers: [
    {
      provide: ConfigService,
      useFactory: configFactory,
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
