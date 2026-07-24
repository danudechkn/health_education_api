import { Request, Response, NextFunction } from "express";

/**
 * Simple request logger middleware.
 * Logs method, path, status code, and response time.
 */
export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const color =
      res.statusCode >= 500
        ? "\x1b[31m" // red
        : res.statusCode >= 400
        ? "\x1b[33m" // yellow
        : "\x1b[32m"; // green
    const reset = "\x1b[0m";

    console.log(
      `${color}[${new Date().toISOString()}] ${req.method} ${req.path} → ${res.statusCode} (${duration}ms)${reset}`
    );
  });

  next();
}
