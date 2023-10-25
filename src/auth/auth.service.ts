import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/types/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) throw new UnauthorizedException('Invalid email!!!');

    const match = await bcrypt.compare(password, user.password);
    if (match) return user;

    throw new UnauthorizedException('Invalid password!!!');
  }

  async login(user: IUser) {
    const { id, email } = user;
    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }
}
