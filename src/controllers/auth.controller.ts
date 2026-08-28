import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import db from "../models/it-center/index";
import { recordFailedAttempt, clearAttempts } from "../middleware/loginLimiter.middleware";

const JWT_SECRET = process.env.JWT_SECRET || "digital-lhe-secret-key-2026";

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { user_name, password } = req.body;
      const ip = req.ip || req.socket.remoteAddress || "unknown";

      if (!user_name || !password) {
        res.status(400).json({ success: false, message: "Username and password are required" });
        return;
      }

      // Hardcoded check for superadmin
      if (user_name === "superadmin" && password === "super123") {
        clearAttempts(ip, user_name);
        const token = jwt.sign(
          {
            user_name: "superadmin",
            role: "superadmin",
            name: "Super Admin"
          },
          JWT_SECRET,
          { expiresIn: "8h" }
        );

        res.status(200).json({
          success: true,
          message: "Login successful",
          data: {
            token,
            user: {
              user_name: "superadmin",
              name: "Super Admin",
              role: "superadmin"
            }
          }
        });
        return;
      }

      // Query database for admin
      const admin = await db.UsersAdmin.findOne({ where: { user_name } });

      if (!admin) {
        const { count, lockTimeMin } = recordFailedAttempt(ip, user_name);
        if (lockTimeMin > 0) {
          res.status(401).json({
            success: false,
            message: `คุณกรอกรหัสผ่านผิดติดต่อกัน ${count} ครั้ง บัญชีนี้ถูกล็อกเป็นเวลา ${lockTimeMin} นาที`
          });
        } else {
          const remaining = 5 - count;
          res.status(401).json({
            success: false,
            message: `ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง (เหลือโอกาสอีก ${remaining} ครั้ง)`
          });
        }
        return;
      }

      // Compare password
      const isMatch = await bcryptjs.compare(password, admin.password);
      if (!isMatch) {
        const { count, lockTimeMin } = recordFailedAttempt(ip, user_name);
        if (lockTimeMin > 0) {
          res.status(401).json({
            success: false,
            message: `คุณกรอกรหัสผ่านผิดติดต่อกัน ${count} ครั้ง บัญชีนี้ถูกล็อกเป็นเวลา ${lockTimeMin} นาที`
          });
        } else {
          const remaining = 5 - count;
          res.status(401).json({
            success: false,
            message: `ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง (เหลือโอกาสอีก ${remaining} ครั้ง)`
          });
        }
        return;
      }

      // Success
      clearAttempts(ip, user_name);

      // Generate JWT Token
      const token = jwt.sign(
        {
          id: admin.id,
          user_name: admin.user_name,
          role: "admin",
          name: admin.name || admin.user_name
        },
        JWT_SECRET,
        { expiresIn: "8h" }
      );

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          token,
          user: {
            id: admin.id,
            user_name: admin.user_name,
            name: admin.name || admin.user_name,
            role: "admin"
          }
        }
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
  }
}
