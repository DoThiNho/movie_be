import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { LocalAuthGuard } from 'src/modules/auth/passport/local-auth.guard';
import { User } from 'src/modules/users/entities/user.entities';
import { Public } from 'src/decorator/customize';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  login(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  async register(@Body() signUpDto: RegisterDto) {
    return await this.authService.register(signUpDto);
  }

  @Get('me')
  @ApiBearerAuth()
  getProfile(@Request() req: { user: User }) {
    return req.user;
  }
}
