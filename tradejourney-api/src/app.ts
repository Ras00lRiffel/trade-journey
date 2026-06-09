import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import tradeRoutes from "./routes/trade.routes";

const app = express();
app.use(cors());
app.use(express.json());
// Register routes
app.use("/api/auth", authRoutes);
// Trade routes
app.use(
  "/api/trades",
  tradeRoutes
);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "TradeJourney API Running"
  });
});

export default app;