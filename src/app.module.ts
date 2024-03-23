import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, AuthService],
})
export class AppModule {}
