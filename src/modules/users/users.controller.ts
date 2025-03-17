import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { UpdateUserDto } from 'src/modules/users/dto';
import { Public } from 'src/decorator/customize';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Public()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const updatedUser = await this.usersService.updateUser(id, user);
    if (!updatedUser) {
      throw new NotFoundException(`User not found`);
    }
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isDeleted = await this.usersService.deleteUser(id);
    if (!isDeleted) {
      throw new NotFoundException(`User not found`);
    }
    return null;
  }
}
