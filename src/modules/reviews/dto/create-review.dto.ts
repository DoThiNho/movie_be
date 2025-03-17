import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'Id user is required' })
  @ApiProperty()
  userId: string;
  @IsNotEmpty({ message: 'Id movie is required' })
  @ApiProperty()
  movieId: string;
  @IsNotEmpty({ message: 'Content is required' })
  @ApiProperty()
  content: string;
}
