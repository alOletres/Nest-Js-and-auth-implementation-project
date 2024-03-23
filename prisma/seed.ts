import { faker } from '@faker-js/faker/locale/en';
import { PrismaClient, USER_ROLE } from '@prisma/client';
import { prompt } from 'enquirer';
import { seedUser } from './seeders/seed-user';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

const prisma = new PrismaClient();
const main = async () => {
  const answers = await prompt([
    {
      type: 'input' as const,
      message: 'What is your email?',
      name: 'email',
      validate: async (value: string) => {
        const exists = await prisma.auth.findUnique({
          where: { email: value },
        });

        if (exists) {
          return 'This email is already used. Please use other email.';
        }
        return true;
      },
    },
    {
      type: 'select',
      message: 'Select your role!',
      name: 'role',
      choices: Object.values(USER_ROLE),
    },
  ]);
  const payload = {
    name: faker.person.fullName(),
    address: faker.location.city(),
    contact: faker.phone.number(),
    ...answers,
  } as CreateUserDto;

  await seedUser(payload)
    .then(() => console.log('Done seeding...'))
    .catch((err) => console.log(`Seeding error ${err}`));
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
