import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Like, Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const review = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(review);
  }

  findAllReviewByUser(userId: string): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { user: { id: userId } },
      relations: ['movie', 'user'],
    });
  }

  async findAllReviewByMovie(movieId: string, paginationDto: PaginationDto) {
    const { Search, PageNumber, PageSize, IsSortDesc, SortBy } = paginationDto;
    const isEmptyObject = (obj: object) => Object.values(obj).length === 0;

    if (isEmptyObject(paginationDto)) {
      return this.reviewRepository.find({
        where: { movie: { id: movieId } },
        relations: ['movie', 'user'],
      });
    }

    const order = SortBy
      ? { [SortBy]: IsSortDesc ? 'DESC' : 'ASC' }
      : undefined;

    const reviews = await this.reviewRepository.find({
      skip: (PageNumber - 1) * PageSize,
      take: PageSize,
      order,
      where: Search ? { content: Like(`%${Search}%`) } : undefined,
    });

    return reviews;
  }

  async findOne(id: string) {
    try {
      return await this.reviewRepository.findOneOrFail({
        where: { id },
        relations: ['movie', 'user'],
      });
    } catch {
      throw new HttpException(`Review  not found`, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    let foundReview = await this.reviewRepository.findOneBy({ id });
    if (!foundReview) {
      throw new HttpException(`Movie  not found`, HttpStatus.NOT_FOUND);
    }
    foundReview = {
      ...foundReview,
      ...updateReviewDto,
      updated_at: new Date(),
    };
    return this.reviewRepository.save(foundReview);
  }

  async remove(id: string) {
    const foundReview = await this.reviewRepository.findOneBy({ id });
    if (!foundReview) {
      throw new HttpException(`Movie  not found`, HttpStatus.NOT_FOUND);
    }
    await this.reviewRepository.delete(id);
    return id;
  }
}
