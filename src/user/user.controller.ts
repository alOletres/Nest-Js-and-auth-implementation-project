import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FetchAllUserDto } from './dto/fetchall-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiCreatedResponse({
    type: CreateUserDto,
  })
  @Post()
  async create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @ApiCreatedResponse({
    type: UpdateUserDto,
  })
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(id, payload);
  }

  @ApiResponse({
    status: 200,
    type: FetchAllUserDto,
    isArray: true,
  })
  @Get('/')
  async fetchAll() {
    return this.userService.fetchAll();
  }
}
