import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private configService: ConfigService) {}
  
  async create(createUserDto: CreateUserDto) {
    const existUser  = await this.userRepository.findOne({
      where: {email: createUserDto.email}
    })

    if(existUser) throw new BadRequestException('User by this email is already exist!')
    const password = await bcrypt.hash(this.configService.get('JWT_SECRET'), 10)

    const user  = await this.userRepository.save({
      email: createUserDto.email,
      password
    })
    return user;
  }

  async findAll() {
    const users = await this.userRepository
    
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
