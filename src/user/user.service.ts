import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existUser)
      throw new BadRequestException('User by this email is already exist!');
    const password = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password,
    });
    const { token } = await this.authService.login({ id: user.id.toString(), email: user.email })
    return {...user, token};
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
