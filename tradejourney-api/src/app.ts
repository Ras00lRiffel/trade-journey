import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "TradeJourney API Running"
  });
});

export default app;