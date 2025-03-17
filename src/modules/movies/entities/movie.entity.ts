import { Like } from 'src/modules/likes/entities/like.entity';
import { MovieGenre } from 'src/modules/movie_genres/entities/movie_genre.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  director: string;

  @Column({ type: 'int' })
  duration: number;

  @Column()
  releaseDate: Date;

  @Column()
  poster_url: string;

  @Column()
  rating: number;

  @OneToMany(() => Review, (review) => review.movie, { onDelete: 'CASCADE' })
  reviews: Review[];

  @OneToMany(() => Like, (like) => like.movie, { onDelete: 'CASCADE' })
  likes: Like[];

  @OneToMany(() => MovieGenre, (movieGenre) => movieGenre.genre, {
    onDelete: 'CASCADE',
  })
  movie_genres: MovieGenre[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
