import {
  Body,
  Controller,
  Post,
  UploadedFile,
  // UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadFileDto } from './dto/create-image.dto';

@Controller('images')
@ApiBearerAuth()
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload/user')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'File upload', type: UploadFileDto })
  uploadImageUser(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: string,
  ) {
    return this.imageService.uploadFile(file, userId);
  }
  @Post('upload/movie')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'File upload', type: UploadFileDto })
  uploadImageMovie(
    @UploadedFile() file: Express.Multer.File,
    @Body('movieId') movieId: string,
  ) {
    return this.imageService.uploadFile(file, movieId);
  }
  // @Post('uploads')
  // @UseInterceptors(FilesInterceptor('file[]', 5))
  // uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
  //   //... handle multiple files
  // }
}
