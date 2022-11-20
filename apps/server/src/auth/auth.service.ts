import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
export type LoginData = {
  id: number;
  username: string;
  password: string;
  accountId: number;
};
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: LoginData) {
    const payload = {
      sub: user.id,
      username: user.username,
      accountId: user.accountId,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string) {
    try {
      const user = await this.userService.findUserName(username);

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) return null;

      return user;
    } catch (error) {
      return null;
    }
  }
}
