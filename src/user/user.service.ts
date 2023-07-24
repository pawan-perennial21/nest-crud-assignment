import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserData() {
    return 'From service file';
  }
}
