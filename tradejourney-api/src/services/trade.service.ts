import pool from "../config/db";
import { CreateTradeDto } from "../types/trade.types";

const toDbValue = (value: unknown) => value ?? null;

export const createTrade = async (
  userId: number,
  trade: CreateTradeDto

) => {

  const [result]: any = await (pool as any).execute(
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

  const [rows] = await (pool as any).execute(
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

  const [rows]: any = await (pool as any).execute(
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

export const updateTrade = async (
  userId: number,
  uuid: string,
  trade: any
) => {

  const [result]: any = await (pool as any).execute(
    `
    UPDATE trades
    SET
      pair_name = ?,
      instrument_type = ?,
      direction = ?,
      session = ?,
      trade_bias = ?,
      trade_date = ?,
      account_balance = ?,
      risk_percent = ?,
      risk_amount = ?,
      entry_price = ?,
      stop_loss = ?,
      take_profit = ?,
      rr = ?,
      actual_rr = ?,
      result = ?,
      pnl = ?,
      notes = ?,
      trade_status = ?,
      analysis_grade = ?,
      execution_grade = ?
    WHERE uuid = ?
      AND user_id = ?
    `,
    [
      toDbValue(trade.pair_name),
      toDbValue(trade.instrument_type),
      toDbValue(trade.direction),
      toDbValue(trade.session),
      toDbValue(trade.trade_bias),
      toDbValue(trade.trade_date),
      toDbValue(trade.account_balance),
      toDbValue(trade.risk_percent),
      toDbValue(trade.risk_amount),
      toDbValue(trade.entry_price),
      toDbValue(trade.stop_loss),
      toDbValue(trade.take_profit),
      toDbValue(trade.rr),
      toDbValue(trade.actual_rr),
      toDbValue(trade.result),
      toDbValue(trade.pnl),
      toDbValue(trade.notes),
      toDbValue(trade.trade_status),
      toDbValue(trade.analysis_grade),
      toDbValue(trade.execution_grade),
      toDbValue(uuid),
      toDbValue(userId)
    ]
  );

  return result.affectedRows;
};

export const deleteTrade = async (
  userId: number,
  uuid: string
) => {

  const [result]: any = await (pool as any).execute(
    `
    DELETE FROM trades
    WHERE uuid = ?
      AND user_id = ?
    `,
    [uuid, userId]
  );

  return result.affectedRows;
};