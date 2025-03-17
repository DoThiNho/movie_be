import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Id user is required' })
  @ApiProperty()
  userId: string;
  @IsNotEmpty({ message: 'Id review is required' })
  @ApiProperty()
  reviewId: string;
  @IsNotEmpty({ message: 'Content is required' })
  @ApiProperty()
  content: string;
}
