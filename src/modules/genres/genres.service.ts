import { Injectable, NotFoundException } from '@nestjs/common';
import { Genre } from './entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(name: string): Promise<Genre> {
    const genre = this.genreRepository.create({ name });
    return await this.genreRepository.save(genre);
  }

  async findAll(): Promise<Genre[]> {
    return await this.genreRepository.find({
      relations: ['movie_genres'],
    });
  }

  async findOne(id: string) {
    return await this.genreRepository.findOneBy({ id });
  }

  async update(id: string, name: string) {
    const genre = await this.genreRepository.findOne({ where: { id } });
    if (!genre) throw new NotFoundException('Genre not found');

    genre.name = name;
    return await this.genreRepository.save(genre);
  }

  async remove(id: string) {
    return await this.genreRepository.delete(id);
  }
}
