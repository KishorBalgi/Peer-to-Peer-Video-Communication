import bcrypt from "bcrypt";
import AppError from "../utils/appError";
import { signJWT, verifyJWT } from "../utils/jwt.utils";
import { PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
}

// Register:
export const signup = async (data: IUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    throw new AppError(400, "User already exists");
  }

  data.password = await bcrypt.hash(data.password, 10);
  const newUser = await prisma.user.create({
    data,
  });

  return { ...newUser, jwttoken: signJWT({ id: newUser.id }) };
};

// Login:
export const login = async (data: ILogin) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError(400, "User does not exist");
  }

  const valid = await bcrypt.compare(data.password, user.password);

  if (!valid) {
    throw new Error("Invalid password");
  }

  return { ...user, jwttoken: signJWT({ id: user.id }) };
};

// Is Authenticated:
export const isAuthenticated = async (token: string) => {
  const { id } = verifyJWT(token) as JwtPayload;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AppError(400, "User does not exist");
  }

  return { ...user, jwttoken: signJWT({ id: user.id }) };
};
