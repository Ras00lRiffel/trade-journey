import { Router } from "express";

import { authenticate }
from "../middleware/auth.middleware";

import * as tradeController
from "../controllers/trade.controller";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  tradeController.createTrade
);

router.get(
  "/",
  tradeController.getTrades
);

router.get(
  "/:uuid",
  tradeController.getTrade
);

router.put(
  "/:uuid",
  tradeController.updateTrade
);

router.delete(
  "/:uuid",
  tradeController.deleteTrade
);

export default router;