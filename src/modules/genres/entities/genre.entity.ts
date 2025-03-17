import { MovieGenre } from 'src/modules/movie_genres/entities/movie_genre.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.genre, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'movie_genres' })
  movie_genres: MovieGenre[];
}
