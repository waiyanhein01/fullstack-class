import { PrismaClient } from "../../generated/prisma/client";
const prisma = new PrismaClient();

export const getAdminByName = async (name: string) => {
  return prisma.admin.findUnique({ where: { username: name } });
};
