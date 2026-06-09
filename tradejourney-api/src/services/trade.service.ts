import pool from "../config/db";
import { CreateTradeDto } from "../types/trade.types";

export const createTrade = async (
  userId: number,
  trade: CreateTradeDto

) => {

  const [result]: any = await pool.execute(
    `
    INSERT INTO trades (
      uuid,
      user_id,
      pair_name,
      instrument_type,
      direction,
      session,
      trade_bias,
      trade_date,
      account_balance,
      risk_percent,
      risk_amount,
      entry_price,
      stop_loss,
      take_profit,
      notes
    )
    VALUES (
      UUID(),
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    )
    `,
    [
      userId,
      trade.pair_name,
      trade.instrument_type,
      trade.direction,
      trade.session ?? null,
      trade.trade_bias ?? null,
      trade.trade_date,
      trade.account_balance ?? null,
      trade.risk_percent ?? null,
      trade.risk_amount ?? null,
      trade.entry_price ?? null,
      trade.stop_loss ?? null,
      trade.take_profit ?? null,
      trade.notes ?? null
    ]
  );

  return result.insertId;
};

export const getTradesByUser = async (
  userId: number
) => {

  const [rows] = await pool.execute(
    `
    SELECT *
    FROM trades
    WHERE user_id = ?
    ORDER BY trade_date DESC
    `,
    [userId]
  );

  return rows;
};

export const getTradeByUuid = async (
  userId: number,
  uuid: string
) => {

  const [rows]: any = await pool.execute(
    `
    SELECT *
    FROM trades
    WHERE uuid = ?
      AND user_id = ?
    LIMIT 1
    `,
    [uuid, userId]
  );

  return rows[0];
};