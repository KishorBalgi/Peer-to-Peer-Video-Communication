import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface CreateCallInput {
  callId: string;
  userId: string;
}

// Create a new call:
export const createCall = async (data: CreateCallInput) => {
  const call = await prisma.call.create({
    data: {
      callId: data.callId,
      userId: data.userId,
    },
  });
  return call;
};

// Find a call by id:
export const getCallById = async (callId: string) => {
  const call = await prisma.call.findUnique({
    where: {
      callId: callId,
    },
  });
  return call;
};
