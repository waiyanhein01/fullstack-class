import { prisma } from "./prismaClientService";

export const createOneProduct = async (productData: any) => {
  const data: any = {
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

  //if optional
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

export const getProductById = async (id: number) => {
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });
};

export const updateProductById = async (
  productId: number,
  productData: any
) => {
  const data: any = {
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
  };

  //if optional
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

  if (productData.images && productData.images.length > 0) {
    data.images = {
      deleteMany: {},
      create: productData.images,
    };
  }
  return prisma.product.update({ where: { id: productId }, data });
};

export const deleteProductById = async (id: number) => {
  return prisma.product.delete({ where: { id } });
};

export const getProductWithRelatedData = async (id: number, userId: number) => {
  // note: use "omit" you can exclude fields from the result and "include" you can include related data
  // note: use "select" to specify which fields you want no need to use "include"
  return prisma.product.findUnique({
    where: { id },
    omit: { createdAt: true, updatedAt: true, categoryId: true, typeId: true }, // Exclude createdAt from the result
    include: {
      images: {
        select: {
          id: true,
          path: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      type: {
        select: {
          name: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
      user: {
        where: {
          id: userId,
        },
        select: {
          id: true,
        },
      },
    },
  });
};

export const getAllProductsLists = async (options: any) => {
  return prisma.product.findMany(options);
};

export const getCategoryTypeLists = async () => {
  return prisma.category.findMany();
};

export const getTypeLists = async () => {
  return prisma.type.findMany();
};
