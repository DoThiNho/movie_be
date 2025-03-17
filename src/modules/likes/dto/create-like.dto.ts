import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty({ message: 'Id user is required' })
  @ApiProperty()
  userId: string;
  @IsNotEmpty({ message: 'Id movie is required' })
  @ApiProperty()
  movieId: string;
}
