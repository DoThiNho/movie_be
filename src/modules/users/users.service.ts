import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/modules/users/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id },
      });
    } catch {
      throw new HttpException(`User  not found`, HttpStatus.NOT_FOUND);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email },
      });
      return user;
    } catch {
      return null;
    }
  }

  async createUser(userCreate: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: userCreate.email },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const newUser = this.userRepository.create(userCreate);
    return this.userRepository.save(newUser);
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    let foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      throw new HttpException(`Book  not found`, HttpStatus.NOT_FOUND);
    }
    foundUser = { ...foundUser, ...user, updated_at: new Date() };
    return await this.userRepository.save(foundUser);
  }

  async deleteUser(id: string): Promise<string> {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      throw new HttpException(`User  not found`, HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete(id);
    return id;
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
