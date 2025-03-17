// cloudinary.module.ts
import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageProvider } from './image.provider';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entities';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  controllers: [ImageController],
  providers: [ImageProvider, ImageService],
  exports: [ImageProvider, ImageService],
})
export class ImageModule {}
