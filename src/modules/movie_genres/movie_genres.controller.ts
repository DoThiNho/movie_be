import { Controller } from '@nestjs/common';
import { MovieGenresService } from './movie_genres.service';

@Controller('movie-genres')
export class MovieGenresController {
  constructor(private readonly movieGenresService: MovieGenresService) {}
}
