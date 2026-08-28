import { Response } from "express";
import bcryptjs from "bcryptjs";
import db from "../models/it-center/index";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export class AdminController {
  static async ListAdmins(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const admins = await db.UsersAdmin.findAll({
        attributes: ["id", "user_name", "name"],
        order: [["id", "DESC"]]
      });

      res.status(200).json({
        success: true,
        data: admins
      });
    } catch (error: any) {
      console.error("ListAdmins error:", error);
      res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
  }

  static async AddAdmin(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      // Security check: Only allow superadmin to add other admins
      if (req.user?.role !== "superadmin") {
        res.status(403).json({ success: false, message: "Forbidden: Only superadmin can add other admins" });
        return;
      }

      const { user_name, password, name } = req.body;

      if (!user_name || !password) {
        res.status(400).json({ success: false, message: "Username and password are required" });
        return;
      }

      // Check if username already exists
      const existing = await db.UsersAdmin.findOne({ where: { user_name } });
      if (existing || user_name === "superadmin") {
        res.status(400).json({ success: false, message: "Username is already taken" });
        return;
      }

      // Hash the password using bcryptjs
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Create new admin user
      const newAdmin = await db.UsersAdmin.create({
        user_name,
        password: hashedPassword,
        name: name || null
      });

      res.status(201).json({
        success: true,
        message: "Admin user created successfully",
        data: {
          id: newAdmin.id,
          user_name: newAdmin.user_name,
          name: newAdmin.name
        }
      });
    } catch (error: any) {
      console.error("AddAdmin error:", error);
      res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
  }
}
