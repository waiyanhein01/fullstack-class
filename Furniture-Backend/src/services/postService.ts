import { prisma } from "./prismaClientService"; // Adjust the import path as necessary

export interface PostArg {
  title: string;
  content: string;
  body: string;
  image: string;
  authorId: number;
  category: string;
  type: string;
  tags: string[];
}

export const createOnePost = async (postData: PostArg) => {
  const data: any = {
    title: postData.title,
    content: postData.content,
    body: postData.body,
    image: postData.image,
    author: {
      connect: {
        id: postData.authorId,
      },
    },
    category: {
      connectOrCreate: {
        where: {
          name: postData.category,
        },
        create: {
          name: postData.category,
        },
      },
    },
    type: {
      connectOrCreate: {
        where: {
          name: postData.type,
        },
        create: {
          name: postData.type,
        },
      },
    },
  };

  if (postData.tags && postData.tags.length > 0) {
    data.tags = {
      connectOrCreate: postData.tags.map((tagName) => ({
        where: {
          name: tagName,
        },
        create: {
          name: tagName,
        },
      })),
    };
  }
  return prisma.post.create({ data });
};

export const getPostById = async (id: number) => {
  return prisma.post.findUnique({ where: { id } });
};

export const updatePostById = async (postId: number, postData: PostArg) => {
  const data: any = {
    title: postData.title,
    content: postData.content,
    body: postData.body,
    category: {
      connectOrCreate: {
        where: {
          name: postData.category,
        },
        create: {
          name: postData.category,
        },
      },
    },
    type: {
      connectOrCreate: {
        where: {
          name: postData.type,
        },
        create: {
          name: postData.type,
        },
      },
    },
  };

  if (postData.image) {
    data.image = postData.image;
  }

  if (postData.tags && postData.tags.length > 0) {
    data.tags = {
      connectOrCreate: postData.tags.map((tagName) => ({
        where: {
          name: tagName,
        },
        create: {
          name: tagName,
        },
      })),
    };
  }

  return prisma.post.update({ where: { id: postId }, data });
};

export const deletePostById = async (id: number) => {
  return prisma.post.delete({ where: { id } });
};

// Fetch a post with related data like author, category, type, and tags
export const getPostWithRelatedData = async (id: number) => {
  return prisma.post.findUnique({
    where: { id },
    // omit: {createdAt: true},// Exclude createdAt from the result
    select: {
      id: true,
      title: true,
      content: true,
      body: true,
      image: true,
      author: {
        select: {
          // firstName: true,
          // lastName: true,
          fullName: true, // Computed field for full name
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
      updatedAt: true,
    },
  });
};

export const getAllPostsByOffsetPaginationData = async (options: any) => {
  return prisma.post.findMany(options);
};
