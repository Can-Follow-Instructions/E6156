import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    let user = await this.usersService.findByEmail(req.user.email);
    if (!user) {
      user = await this.usersService.create({
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      });
    }

    req.session.user = user;
  }
}
