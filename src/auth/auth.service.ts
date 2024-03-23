import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async login(user: User) {
    const access_token = this.jwtService.sign(user, {
      secret: process.env.AUTH_SECRET_KEY,
      expiresIn: '1d',
    });

    return {
      access_token,
    };
  }

  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.prismaService.auth.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        status: true,
        userId: true,
        User: {
          select: { name: true, contact: true, address: true, role: true },
        },
      },
    });

    if (!user) throw new BadRequestException('User not found!');

    const { User, ...credentials } = user;

    const { password: hasPassword, status } = credentials;

    if (!status) throw new UnauthorizedException('User account is inactive!');

    const isComparePassword = await compare(password, hasPassword);

    if (!isComparePassword)
      throw new BadRequestException('Password is incorrect!');

    return User;
  }
}
