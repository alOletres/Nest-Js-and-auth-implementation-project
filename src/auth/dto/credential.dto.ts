import { PickType } from '@nestjs/swagger';
import { Auth as AuthEntity } from './../../_gen-prisma-classes/auth';

export class CredentialDto extends PickType(AuthEntity, [
  'email',
  'password',
] as const) {}
