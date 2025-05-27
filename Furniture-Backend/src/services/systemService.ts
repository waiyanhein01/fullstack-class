import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getSettingStatus = async (key: string) => {
  return prisma.setting.findUnique({
    where: { key },
  });
};

// this function sets the maintenance mode status if exists will update value and if not will create a new one
export const createOrUpdateSettingStatus = async (
  key: string,
  value: string
) => {
  return prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
};
