import { Request, Response, NextFunction } from "express";

/**
 * Global error-handling middleware.
 * Must be registered LAST in app.ts (after all routes).
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  const status: number =
    typeof err.status === "number" ? err.status : 500;

  const message: string =
    err.message || "An unexpected error occurred";

  console.error(`[ERROR] ${req.method} ${req.path} →`, err);

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
