import { Router } from "express";
import {
  signupController,
  loginController,
} from "../controllers/auth.controller";

const router = Router();

// Sign up:
router.post("/signup", signupController);

// Sign in:
router.post("/login", loginController);

export default router;
