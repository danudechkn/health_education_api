import express from "express";
import { NewsController } from "../controllers/news.controller";
const router = express.Router();
// const apiLogger = require("../middleware/apiLogger");
// const {
//   authenticateToken,
//   authorizeRole,
// } = require("../middleware/authMiddleware");

//route
// router.use(authenticateToken, apiLogger, authorizeRole(1));

// router.get("/mapAll", AllChoiceController.mapAll);
router.get("/contents/:id/image", NewsController.getContentImage);

export default router;