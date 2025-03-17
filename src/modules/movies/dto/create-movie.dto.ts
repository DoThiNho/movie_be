import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty({ message: 'Title is required' })
  @ApiProperty()
  title: string;
  @ApiProperty()
  @IsOptional()
  description: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'director is required' })
  director: string;
  @IsNotEmpty({ message: 'Duration is required' })
  @IsInt()
  @ApiProperty()
  duration: number;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  releaseDate: Date;
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  rating: number;
  @ApiProperty()
  @IsOptional()
  poster_url: string;
  @ApiProperty()
  @IsOptional()
  genresIds: string[];
}
