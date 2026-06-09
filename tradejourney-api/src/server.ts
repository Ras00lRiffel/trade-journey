import dotenv from "dotenv";

dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
app.get("/api/health", (_, res) => {
  console.log("HEALTH ROUTE HIT");

  res.json({
    success: true,
    message: "DEBUG SERVER"
  });
});