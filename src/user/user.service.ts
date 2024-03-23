import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/lib/password';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_ROLE } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create({ name, contact, email, address, role }: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        name,
        contact,
        address,
        role,
        Auth: {
          create:
            role === USER_ROLE.ADMIN
              ? {
                  email,
                  password: await hashPassword(process.env.DEFAULT_PASSWORD),
                }
              : undefined,
        },
      },
    });

    if (user) {
      return { message: 'User successfully created!' };
    }
  }

  async update(id: number, payload: UpdateUserDto) {
    const { name, contact, address, role } = payload;
    const user = await this.prismaService.user.update({
      where: { id },
      data: { name, contact, address, role },
    });

    if (user) {
      return { message: 'User successfully updated!' };
    }
  }

  async fetchAll() {
    const user = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        contact: true,
        address: true,
        role: true,
        Auth: { select: { email: true } },
      },
    });

    return user.map((value) => {
      const { Auth, ...users } = value;
      return { ...users, email: Auth?.email ?? '' };
    });
  }
}
