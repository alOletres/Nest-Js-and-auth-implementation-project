import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: Boolean })
  status: boolean = true;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: () => User })
  User: User;
}
