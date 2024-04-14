import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
const app = express();
//routes
app.get("/", (req, res, next) => {
  res.json({ message: "hello from home route" });
});

app.use(globalErrorHandler)
export default app;
