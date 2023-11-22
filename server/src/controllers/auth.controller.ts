import { Request, Response, NextFunction, CookieOptions } from "express";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/response";
import { signup, login, isAuthenticated } from "../services/auth.services";

// Cookie Options for JWT:
const addCookie = (res: Response, req: Request, token: string) => {
  const cookieOps: CookieOptions = {
    expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    httpOnly: process.env.NODE_ENV === "production",
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };
  if (process.env.NODE_ENV === "production") cookieOps.sameSite = "none";
  res.cookie("jwt", token, cookieOps);
};

// Sign up:
export const signupController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Please provide all fields");
    }

    const user = await signup({ name, email, password });

    addCookie(res, req, user.jwttoken);
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

    addCookie(res, req, user.jwttoken);
    sendResponse(res, 200, user);
  }
);

// Is Authenticated:
export const isAuthenticatedController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const jwt = req.cookies?.jwt;

    if (!jwt) {
      throw new Error("Token not found");
    }

    const user = await isAuthenticated(jwt);

    sendResponse(res, 200, user);
  }
);

// Logout:
export const logoutController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
    });
    sendResponse(res, 200, { message: "Logged out" });
  }
);
