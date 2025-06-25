import { prisma } from "./prismaClientService";

export const createOneProduct = async (productData: any) => {
  const data: any = {
    // category,
    // type,
    // tags,
    name: productData.name,
    description: productData.description,
    price: productData.price,
    discount: productData.discount,
    inventory: productData.inventory,
    category: {
      connectOrCreate: {
        where: {
          name: productData.category,
        },
        create: {
          name: productData.category,
        },
      },
    },
    type: {
      connectOrCreate: {
        where: {
          name: productData.type,
        },
        create: {
          name: productData.type,
        },
      },
    },
    images: {
      create: productData.images,
    },
  };

  if (productData.tags && productData.tags.length > 0) {
    data.tags = {
      connectOrCreate: productData.tags.map((tagName: string) => ({
        where: {
          name: tagName,
        },
        create: {
          name: tagName,
        },
      })),
    };
  }
  return prisma.product.create({ data });
};
