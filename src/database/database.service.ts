import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';


@Injectable()
export class DatabaseService {
  constructor(private readonly configService: ConfigService) {
    const databaseHost = this.configService.get('databaseHost');
    const databasePort = this.configService.get('databasePort');
    const databaseUsername = this.configService.get('databaseUsername');
    const databasePassword = this.configService.get('databasePassword');
    const databaseName = this.configService.get('databaseName');

    // Use the configuration values to establish a connection to the database.
    // Your database connection logic goes here...
  }
}
