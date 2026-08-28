import { Request, Response, NextFunction } from "express";

interface LoginAttempt {
  count: number;
  lockUntil: number;
}

// In-memory store for login attempts
const attemptsStore = new Map<string, LoginAttempt>();

export function loginRateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const { user_name } = req.body;
  
  if (!user_name) {
    next();
    return;
  }

  const key = `${ip}:${user_name.trim()}`;
  const record = attemptsStore.get(key);

  if (record) {
    if (record.lockUntil > Date.now()) {
      const remainingSec = Math.ceil((record.lockUntil - Date.now()) / 1000);
      let timeText = "";
      
      if (remainingSec >= 60) {
        const remainingMin = Math.ceil(remainingSec / 60);
        timeText = `${remainingMin} นาที (minutes)`;
      } else {
        timeText = `${remainingSec} วินาที (seconds)`;
      }

      res.status(429).json({
        success: false,
        message: `คุณกรอกรหัสผ่านผิดเกินกำหนด กรุณาลองใหม่อีกครั้งในอีก ${timeText}`
      });
      return;
    }
  }

  next();
}

// Helper to record failed login attempts and calculate dynamic lockout time (progressive lock)
export function recordFailedAttempt(ip: string, username: string): { count: number; lockTimeMin: number } {
  const key = `${ip}:${username.trim()}`;
  let record = attemptsStore.get(key);

  if (!record) {
    record = { count: 0, lockUntil: 0 };
  }

  record.count += 1;

  let lockTimeMin = 0;
  if (record.count === 5) {
    lockTimeMin = 1;     // Lock for 1 minute
  } else if (record.count === 6) {
    lockTimeMin = 5;     // Lock for 5 minutes
  } else if (record.count === 7) {
    lockTimeMin = 15;    // Lock for 15 minutes
  } else if (record.count >= 8) {
    lockTimeMin = 60;    // Lock for 60 minutes
  }

  if (lockTimeMin > 0) {
    record.lockUntil = Date.now() + lockTimeMin * 60 * 1000;
  } else {
    record.lockUntil = 0;
  }

  attemptsStore.set(key, record);
  return { count: record.count, lockTimeMin };
}

// Helper to clear attempts on successful login
export function clearAttempts(ip: string, username: string): void {
  const key = `${ip}:${username.trim()}`;
  attemptsStore.delete(key);
}
