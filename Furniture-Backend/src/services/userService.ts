import { prisma } from "./prismaClientService";

export const addProductToFavourite = async (
  userId: number,
  productId: number
) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      products: {
        connect: {
          id: productId,
        },
      },
    },
  });
};
export const removeProductFromFavourite = async (
  userId: number,
  productId: number
) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      products: {
        disconnect: {
          id: productId,
        },
      },
    },
  });
};

export const getModifyUser = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      image: true,
      role: true,
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          images: {
            select: {
              id: true,
              path: true,
            },
          },
        },
      },
    },
  });
};
