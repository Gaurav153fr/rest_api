import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";
const app = express();
app.use(express.json());
//routes
app.get("/", (req, res, next) => {
  res.json({ message: "hello from home route" });
});
app.use("/api/users", userRouter);
app.use("/api/book", bookRouter);
app.use(globalErrorHandler);
export default app;
