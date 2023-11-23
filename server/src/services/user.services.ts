import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get user:
export const getUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};
