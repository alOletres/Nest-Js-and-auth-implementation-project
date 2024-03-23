import { createStandaloneApplication } from 'src/create-application';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

export const seedUser = async (payload: CreateUserDto) => {
  const app = await createStandaloneApplication({ logger: ['error'] });

  const userService = app.get(UserService);

  await userService.create(payload);
};
