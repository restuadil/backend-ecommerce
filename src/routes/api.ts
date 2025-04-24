import { Router } from "express";
import { AuthController } from "../api/auth/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { CategoryController } from "../api/category/category.controller";
import { UserController } from "../api/user/user.controller";
import { BrandController } from "../api/brand/brand.controller";

export const router = Router();
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/profile", authMiddleware, AuthController.profile);

router.get("/categories", CategoryController.get);
router.get("/category/:id", authMiddleware, CategoryController.getById);
router.post("/category", authMiddleware, CategoryController.create);
router.put("/category/:id", authMiddleware, CategoryController.update);
router.delete("/category/:id", authMiddleware, CategoryController.delete);

router.get("/brands", BrandController.get);
router.post("/brand", authMiddleware, BrandController.create);
router.put("/brand/:id", authMiddleware, BrandController.update);
router.delete("/brand/:id", authMiddleware, BrandController.delete);
router.get("/brand/:id", authMiddleware, BrandController.getById);

router.get("/users", UserController.get);
