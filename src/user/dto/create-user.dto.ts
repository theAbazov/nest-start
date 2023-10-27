import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: 'example@gmail.com',
    minimum: 1
  })
  @IsEmail({}, { message: 'Email must be contain "@somestr.somestr"' })
  email: string;

  @ApiProperty()
  @MinLength(6, { message: 'Password must be more than 6 characters' })
  password: string;

}
