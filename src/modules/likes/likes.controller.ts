import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get('has-liked')
  async hasLiked(
    @Query('userId') userId: string,
    @Query('movieId') movieId: string,
  ): Promise<{ liked: boolean }> {
    const liked = await this.likesService.hasUserLikedMovie(userId, movieId);
    return { liked };
  }

  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(id);
  }
}
