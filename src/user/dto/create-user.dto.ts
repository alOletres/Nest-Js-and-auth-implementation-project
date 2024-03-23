import { ApiProperty, PickType } from '@nestjs/swagger';
import { User as UserEntity } from './../../_gen-prisma-classes/user';
import { Auth as AuthEntity } from './../../_gen-prisma-classes/auth';
import { IsOptional } from 'class-validator';

export class CreateUserDto extends PickType(UserEntity, [
  'name',
  'contact',
  'address',
  'role',
]) {
  @ApiProperty({ type: String })
  @IsOptional()
  email: AuthEntity['email'];
}
