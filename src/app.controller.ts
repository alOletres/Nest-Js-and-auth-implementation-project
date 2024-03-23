import { Controller, Post, Res, UseGuards, Request } from '@nestjs/common';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CredentialDto } from './auth/dto/credential.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({
    type: CredentialDto,
  })
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.authService.login(req.user);

    res.status(200).send({ access_token });
  }
}
