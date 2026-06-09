export type TradeDirection =
  | "LONG"
  | "SHORT";

export type TradeResult =
  | "WIN"
  | "LOSS"
  | "BE";

export type TradeStatus =
  | "PLANNED"
  | "OPEN"
  | "CLOSED"
  | "CANCELLED";

export interface Trade {
  id: number;

  uuid: string;

  pair_name: string;

  direction: TradeDirection;

  result: TradeResult;

  trade_status: TradeStatus;

  rr: number;

  actual_rr: number;

  pnl: number;

  notes?: string;
}