import { Response } from "express";

import { AuthRequest }
from "../middleware/auth.middleware";

import * as tradeService
from "../services/trade.service";

export const createTrade = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const tradeId =
      await tradeService.createTrade(
        req.user!.userId,
        req.body
      );

    res.status(201).json({
      success: true,
      tradeId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create trade"
    });

  }

};

export const getTrades = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const trades =
      await tradeService.getTradesByUser(
        req.user!.userId
      );

    res.status(200).json({
      success: true,
      trades
    });

  } catch (error) {

    res.status(500).json({
      success: false
    });

  }

};

export const getTrade = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const uuid = Array.isArray(req.params.uuid)
      ? req.params.uuid[0]
      : req.params.uuid;

    const trade =
      await tradeService.getTradeByUuid(
        req.user!.userId,
        uuid
      );

    if (!trade) {

      res.status(404).json({
        success: false,
        message: "Trade not found"
      });

      return;
    }

    res.status(200).json({
      success: true,
      trade
    });

  } catch (error) {

    res.status(500).json({
      success: false
    });

  }

};

export const updateTrade = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {
    const uuid = Array.isArray(req.params.uuid)
      ? req.params.uuid[0]
      : req.params.uuid;

    const affectedRows =
      await tradeService.updateTrade(
        req.user!.userId,
        uuid,
        req.body
      );

    if (!affectedRows) {

      res.status(404).json({
        success: false,
        message: "Trade not found"
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Trade updated"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update trade"
    });

  }

};

export const deleteTrade = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {
    const uuid = Array.isArray(req.params.uuid)
      ? req.params.uuid[0]
      : req.params.uuid;

    const affectedRows =
      await tradeService.deleteTrade(
        req.user!.userId,
        uuid
      );

    if (!affectedRows) {

      res.status(404).json({
        success: false,
        message: "Trade not found"
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Trade deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete trade"
    });

  }

};