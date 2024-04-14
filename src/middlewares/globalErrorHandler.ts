import { config } from "../config/config";
import { HttpError } from "http-errors";
import { Request,Response,NextFunction } from "express";
//global error handler
const globalErrorHandler=(err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      message: err.message,
      errorStack: config.env === "development" ? err.stack : "",
    });
  }

  export default globalErrorHandler