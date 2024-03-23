import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.register({
      secret: process.env.AUTH_SECRET_KEY,

      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    JwtService,
    PrismaService,
    LocalStrategy,
  ],

  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
