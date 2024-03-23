import { Auth } from './auth';
import { USER_ROLE } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  contact: string;

  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ enum: USER_ROLE, enumName: 'USER_ROLE' })
  role: USER_ROLE = USER_ROLE.EMPLOYEE;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiPropertyOptional({ type: () => Auth })
  Auth?: Auth;
}
