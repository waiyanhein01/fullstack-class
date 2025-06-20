import { PrismaClient } from "../../generated/prisma";

export const prisma = new PrismaClient().$extends({
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute({ firstName, lastName }) {
          return `${firstName ?? ""} ${lastName ?? ""}`;
        },
      },
      image: {
        needs: { image: true },
        compute(user) {
          return user.image
            ? `/optimized/${user.image.split(".")[0]}.webp`
            : user.image; // Assuming image is stored in optimized folder
        },
      },
    },
    post: {
      image: {
        needs: { image: true },
        compute(post) {
          return post.image
            ? `/optimized/${post.image.split(".")[0]}.webp`
            : post.image; // Assuming image is stored in optimized folder
        },
      },
      updatedAt: {
        needs: { updatedAt: true },
        compute(post) {
          return post.updatedAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        },
      },
    },
  },
});
