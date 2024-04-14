import express from "express";

const app = express();
//routes
app.get("/", (req, res, next) => {
  res.json({ message: "hello from home route" });
});
export default app;
