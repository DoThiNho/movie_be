import { Injectable } from '@nestjs/common';
import { MovieGenre } from './entities/movie_genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MovieGenresService {
  constructor(
    @InjectRepository(MovieGenre)
    private readonly movieGenreRepository: Repository<MovieGenre>,
  ) {}
}
