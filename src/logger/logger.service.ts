import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService extends Logger {
  private readonly logger: winston.Logger;

  constructor() {
    super();
    this.logger = winston.createLogger({
      level: 'info', // Set the log level (error, warn, info, verbose, debug, silly)
      format: winston.format.json(), // Use JSON format for logging
      transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to error.log file
        new winston.transports.File({ filename: 'combined.log' }), // Log all levels to combined.log file
      ],
    });
  }

  // Create your custom logging methods (optional)
  logCustomMessage(message: string) {
    this.logger.info(message);
  }

  logCustomError(errorMessage: string) {
    this.logger.error(errorMessage);
  }
}
