import { faker, fi } from "@faker-js/faker";
import { PrismaClient, Prisma } from "../generated/prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

// const userData: Prisma.UserCreateInput[] = [
//   {
//     phone: "1234567890",
//     password: "",
//     randToken: "hasfpwehsdvnuru490dnpsf39u48n3u4",
//   },
//   {
//     phone: "1234567891",
//     password: "",
//     randToken: "hasfpwehsdvnuru490dnpsf39u48n3u4",
//   },
//   {
//     phone: "1234567892",
//     password: "",
//     randToken: "hasfpwehsdvnuru490dnpsf39u48n3u4",
//   },
//   {
//     phone: "1234567893",
//     password: "",
//     randToken: "hasfpwehsdvnuru490dnpsf39u48n3u4",
//   },
//   {
//     phone: "1234567894",
//     password: "",
//     randToken: "hasfpwehsdvnuru490dnpsf39u48n3u4",
//   },
//   {
//     phone: "1234567895",
//     password: "",
//     randToken: "hasfpwehsdvnuru490dnpsf39u48n3u4",
//   },
// ];

function createRandomUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    image: faker.image.avatar(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: "international" }).slice(2),
    password: "",
    randToken: faker.internet.jwt(),
  };
}

export const userData = faker.helpers.multiple(createRandomUser, {
  count: 5,
});

async function main() {
  console.log("Seeding started");
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash("123456", salt);

  userData.forEach(async (user) => {
    user.password = password;
    await prisma.user.create({
      data: user,
    });
  });
  console.log("Seeding finished");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
