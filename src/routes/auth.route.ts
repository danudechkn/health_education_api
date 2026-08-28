import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { loginRateLimiter } from "../middleware/loginLimiter.middleware";

const router = express.Router();

router.post("/login", loginRateLimiter, AuthController.login);

export default router;