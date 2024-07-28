import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { LoginDto } from './dtos/LoginDto.dto';
import { RefreshTokenDto } from './dtos/RefreshTokenDto.dto';
import { ConfigService } from '@nestjs/config';

const EXPIRE_TIME = 60 * 1000; //60s === 1min

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      ...user,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '5min',
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  async refreshToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '5min',
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
