import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { comparePasswordHelper, hashPasswordHelper } from 'src/helpers/util';
import { AccessTokenDto } from 'src/modules/auth/dto/access-token.dto';
import { User } from 'src/modules/users/entities/user.entities';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  isEmailExist = async (email: string) => {
    try {
      const user = await this.usersService.getUserByEmail(email);

      if (user) return true;
    } catch {
      return false;
    }
  };

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) return null;
    const isValidPassword = await comparePasswordHelper(
      password,
      user.password,
    );
    if (!isValidPassword) return null;
    return user;
  }

  // async login(loginDto: LoginDto) {
  //   const { email, password } = loginDto;
  //   const user = await this.usersService.getUserByEmail(email);
  //   if (!user) throw new UnauthorizedException('User not found');
  //   const isValidPassword = await comparePasswordHelper(
  //     password,
  //     user.password,
  //   );
  //   if (!isValidPassword) throw new UnauthorizedException('Invalid password');
  //   const token = this.jwtService.sign(
  //     { id: user.id },
  //     {
  //       secret: process.env.JWT_SECRET,
  //     },
  //   );
  //   return token;
  // }

  login(user: User) {
    const payload: AccessTokenDto = {
      email: user.email,
      sub: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address,
      image: user.image,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(signUpDto: RegisterDto) {
    const { email, password } = signUpDto;

    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(`Email already exists: ${email}`);
    }
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.usersService.createUser({
      ...signUpDto,
      password: hashPassword ?? '',
    });

    return this.login(user);
  }
}
