import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const comment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(comment);
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
      relations: ['user', 'review'],
    });
  }

  async findOne(id: string) {
    try {
      return await this.commentRepository.findOneOrFail({
        where: { id },
        relations: ['movie', 'user'],
      });
    } catch {
      throw new HttpException(`Comment  not found`, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    let foundComment = await this.commentRepository.findOneBy({ id });
    if (!foundComment) {
      throw new HttpException(`Movie  not found`, HttpStatus.NOT_FOUND);
    }
    foundComment = {
      ...foundComment,
      ...updateCommentDto,
      updated_at: new Date(),
    };
    return this.commentRepository.save(foundComment);
  }

  async remove(id: string) {
    const foundReview = await this.commentRepository.findOneBy({ id });
    if (!foundReview) {
      throw new HttpException(`Movie  not found`, HttpStatus.NOT_FOUND);
    }
    await this.commentRepository.delete(id);
    return id;
  }
}
