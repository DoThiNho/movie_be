// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from 'src/types/cloudinary-response';
import * as streamifier from 'streamifier';
import { User } from '../users/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async uploadFile(
    file: Express.Multer.File,
    userId: string,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) {
            reject(new Error(error.message || 'Cloudinary upload failed'));
            return;
          }

          if (result?.secure_url) {
            this.userRepository
              .update(userId, { image: result.secure_url })
              .then(() => resolve(result as CloudinaryResponse))
              .catch(() => reject(new Error('Database update failed')));
          } else {
            reject(new Error('Upload failed: No secure_url returned'));
          }
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
