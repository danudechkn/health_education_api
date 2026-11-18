import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import db from "../models/it-center/index";
import { recordFailedAttempt, clearAttempts } from "../middleware/loginLimiter.middleware";

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { user_name, password } = req.body;
      const ip = req.ip || req.socket.remoteAddress || "unknown";
      const jwtSecret = process.env.JWT_SECRET;
      const superAdminUser = process.env.SUPERADMIN_USER;
      const superAdminPass = process.env.SUPERADMIN_PASS;

      if (!jwtSecret) {
        res.status(500).json({ success: false, message: "JWT_SECRET is not configured in .env" });
        return;
      }

      if (!user_name || !password) {
        res.status(400).json({ success: false, message: "Username and password are required" });
        return;
      }

      // Check superadmin credentials from .env
      if (
        superAdminUser &&
        superAdminPass &&
        user_name === superAdminUser &&
        password === superAdminPass
      ) {
        clearAttempts(ip, user_name);
        const token = jwt.sign(
          {
            user_name: superAdminUser,
            role: "superadmin",
            name: "Super Admin"
          },
          jwtSecret,
          { expiresIn: "8h" }
        );

        res.status(200).json({
          success: true,
          message: "Login successful",
          data: {
            token,
            user: {
              user_name: superAdminUser,
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
        jwtSecret,
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
