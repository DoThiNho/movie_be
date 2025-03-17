import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @ApiProperty({ required: false })
  Search: string;
  @IsOptional()
  @ApiProperty({ required: false })
  PageNumber: number;
  @IsOptional()
  @ApiProperty({ required: false })
  PageSize: number;
  @IsOptional()
  @ApiProperty({ required: false })
  IsSortDesc: boolean;
  @IsOptional()
  @ApiProperty({ required: false })
  SortBy: string;
}
