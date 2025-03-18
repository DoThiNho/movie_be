import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { In, Like, Repository } from 'typeorm';
import { MovieGenre } from '../movie_genres/entities/movie_genre.entity';
import { Genre } from '../genres/entities/genre.entity';
import { UpdateMovieDto } from './dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(MovieGenre)
    private readonly movieGenreRepository: Repository<MovieGenre>,

    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}
  async create(createMovieDto: CreateMovieDto) {
    const { title, genresIds } = createMovieDto;

    const existingMovie = await this.movieRepository.findOne({
      where: { title },
    });

    if (existingMovie) {
      throw new Error('Movie with this title already exists');
    }

    const genres = await this.genreRepository.find({
      where: { id: In(genresIds) },
    });

    const newMovie = this.movieRepository.create(createMovieDto);
    await this.movieRepository.save(newMovie);
    console.log({ genres });

    const movieGenres = genres.map((genre) =>
      this.movieGenreRepository.create({ movie: newMovie, genre }),
    );
    await this.movieGenreRepository.save(movieGenres);

    return newMovie;
  }

  async findAll(paginationDto: PaginationDto) {
    const { Search, PageNumber, PageSize, IsSortDesc, SortBy } = paginationDto;
    const isEmptyObject = (obj: object) => Object.values(obj).length === 0;

    if (isEmptyObject(paginationDto)) {
      return this.movieRepository.find({
        relations: ['movie_genres', 'movie_genres.genre'],
      });
    }

    const order = SortBy
      ? { [SortBy]: IsSortDesc ? 'DESC' : 'ASC' }
      : undefined;

    const movies = await this.movieRepository.find({
      skip: (PageNumber - 1) * PageSize,
      take: PageSize,
      order,
      where: Search ? { title: Like(`%${Search}%`) } : undefined,
      relations: ['movie_genres', 'movie_genres.genre'],
    });

    return movies;
  }

  async findOne(id: string): Promise<Movie> {
    try {
      return await this.movieRepository.findOneOrFail({ where: { id } });
    } catch {
      throw new HttpException(`Movie  not found`, HttpStatus.NOT_FOUND);
    }
  }

  async getMoviesByGenre(genreId: string) {
    try {
      const genre = await this.genreRepository.findOne({
        where: { id: genreId },
        relations: ['movie_genres', 'movie_genres.movie'],
      });

      if (!genre) {
        throw new Error(`Genre with id ${genreId} not found`);
      }

      return genre.movie_genres.map((mg) => mg.movie);
    } catch {
      throw new Error('Failed to fetch movies by genre');
    }
  }

  async updateMovie(id: string, updateMovieDto: UpdateMovieDto) {
    try {
      const { genresIds, ...movieData } = updateMovieDto;

      const movie = await this.movieRepository.findOne({
        where: { id },
        relations: ['movieGenres'],
      });

      if (!movie) {
        throw new Error(`Movie with id ${id} not found`);
      }

      Object.assign(movie, movieData);

      if (genresIds) {
        await this.movieGenreRepository.delete({ movie: { id } });

        const genres = await this.genreRepository.find({
          where: { id: In(genresIds) },
        });
        const movieGenres = genres.map((genre) =>
          this.movieGenreRepository.create({ movie, genre }),
        );

        await this.movieGenreRepository.save(movieGenres);
      }

      return await this.movieRepository.save(movie);
    } catch (error) {
      console.error('Error updating movie:', error);
      throw new Error('Failed to update movie');
    }
  }

  async remove(id: string): Promise<string> {
    const foundMovie = await this.movieRepository.findOneBy({ id });
    if (!foundMovie) {
      throw new HttpException(`Movie  not found`, HttpStatus.NOT_FOUND);
    }
    await this.movieRepository.delete(id);
    return id;
  }
}
