import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty()
  name: string;
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is not valid' })
  @ApiProperty()
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty()
  password: string;
  @IsOptional()
  @ApiProperty()
  phone: string;
  @IsOptional()
  @ApiProperty()
  address: string;
  @IsOptional()
  @ApiProperty()
  image: string;
  // @ApiProperty()
  // role: string;
  // @ApiProperty()
  // accountType: string;
  // @ApiProperty()
  // isActive: string;
  // @ApiProperty()
  // codeId: string;
  // @ApiProperty()
  // codeExpired: string;
}
