import express from "express";
import router from "./api/v1/routes/productRoutes.ts.js";

const app = express();

app.use(express.json());

app.use(router)

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;