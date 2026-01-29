import { Router } from "express";
import { getProfile, loginController, registerController } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register",registerController);
router.post("/login", loginController);
router.get('/profile',authenticate,getProfile);

export default router;