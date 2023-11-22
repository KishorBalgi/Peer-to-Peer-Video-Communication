import { Router } from "express";
import {
  signupController,
  loginController,
  isAuthenticatedController,
  logoutController,
} from "../controllers/auth.controller";

const router = Router();

// Sign up:
router.post("/signup", signupController);

// Sign in:
router.post("/login", loginController);

// Is Authenticated:
router.get("/is-authenticated", isAuthenticatedController);

// Logout:
router.get("/logout", logoutController);

export default router;
