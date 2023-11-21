import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/response";
import { signup, login } from "../services/auth.services";

// Sign up:
export const signupController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Please provide all fields");
    }

    const user = await signup({ name, email, password });

    sendResponse(res, 201, user);
  }
);

// login:
export const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide all fields");
    }

    const user = await login({ email, password });

    sendResponse(res, 200, user);
  }
);
