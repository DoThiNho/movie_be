import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty()
  name: string;
}
