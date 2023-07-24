import { Injectable } from '@nestjs/common';
import { ConfigFactory } from '@nestjs/config/dist/interfaces';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    // You can change the process.env.NODE_ENV to set different configurations based on the environment.
    // For simplicity, we'll use the default configuration for now.
    this.envConfig = require('./config.default').default;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

export const configFactory: ConfigFactory = () => {
  return new ConfigService();
};
