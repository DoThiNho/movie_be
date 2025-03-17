import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MovieGenresModule } from '../movie_genres/movie_genres.module';
import { GenresModule } from '../genres/genres.module';
import { MovieGenre } from '../movie_genres/entities/movie_genre.entity';
import { Genre } from '../genres/entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, MovieGenre, Genre]),
    MovieGenresModule,
    GenresModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
