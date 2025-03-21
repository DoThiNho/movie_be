import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is not valid' })
  @ApiProperty()
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty()
  password: string;
}
