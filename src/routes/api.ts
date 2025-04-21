import { Router } from "express";
import { AuthController } from "../api/auth/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { CategoryController } from "../api/category/category.controller";

export const router = Router();
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/profile", authMiddleware, AuthController.profile);

router.get("/category", CategoryController.get);
router.get("/category/:id", CategoryController.getById);
router.post("/category", authMiddleware, CategoryController.create);
router.put("/category/:id", authMiddleware, CategoryController.update);
router.delete("/category/:id", authMiddleware, CategoryController.delete);
