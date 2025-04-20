import { Router } from "express";
import { AuthController } from "../api/auth/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const router = Router();
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/profile", authMiddleware, AuthController.profile);
