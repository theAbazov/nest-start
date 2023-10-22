import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email must be contain "@somestr.somestr"' })
  email: string;

  @MinLength(6, { message: 'Password must be more than 6 characters' })
  password: string;
}
