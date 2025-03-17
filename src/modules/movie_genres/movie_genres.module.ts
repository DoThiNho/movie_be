import { Module } from '@nestjs/common';
import { MovieGenresService } from './movie_genres.service';
import { MovieGenresController } from './movie_genres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieGenre } from './entities/movie_genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieGenre])],
  controllers: [MovieGenresController],
  providers: [MovieGenresService],
  exports: [MovieGenresService],
})
export class MovieGenresModule {}
