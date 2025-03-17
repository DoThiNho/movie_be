import { Genre } from 'src/modules/genres/entities/genre.entity';
import { Movie } from 'src/modules/movies/entities/movie.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movie_genres')
export class MovieGenre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Genre, (genre) => genre.movie_genres, {
    onDelete: 'CASCADE',
  })
  genre: Genre;

  @ManyToOne(() => Movie, (movie) => movie.movie_genres, {
    onDelete: 'CASCADE',
  })
  movie: Movie;
}
