import express from "express";
import { AdminController } from "../controllers/admin.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", authenticateToken, AdminController.ListAdmins);
router.post("/add", authenticateToken, AdminController.AddAdmin);

export default router;
