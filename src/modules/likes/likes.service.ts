import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entities';
import { Movie } from '../movies/entities/movie.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
  ) {}

  async hasUserLikedMovie(userId: string, movieId: string): Promise<boolean> {
    const like = await this.likeRepository.findOne({
      where: { user: { id: userId }, movie: { id: movieId } },
    });
    return !!like;
  }

  async create(createLikeDto: CreateLikeDto) {
    const like = this.likeRepository.create({
      user: { id: createLikeDto.userId } as User,
      movie: { id: createLikeDto.movieId } as Movie,
    });

    return this.likeRepository.save(like);
  }

  async remove(id: string) {
    const foundLike = await this.likeRepository.findOneBy({ id });
    if (!foundLike) {
      throw new HttpException(`Like  not found`, HttpStatus.NOT_FOUND);
    }
    await this.likeRepository.delete(id);
    return id;
  }
}
