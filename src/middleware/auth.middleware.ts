import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "digital-lhe-secret-key-2026";

export interface AuthenticatedRequest extends Request {
  user?: {
    id?: number;
    user_name: string;
    role: string;
    name: string;
  };
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ success: false, message: "Access token is required" });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ success: false, message: "Invalid or expired token" });
      return;
    }
    req.user = decoded as any;
    next();
  });
}
