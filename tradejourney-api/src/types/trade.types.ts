export interface CreateTradeDto {
  pair_name: string;

  instrument_type:
    | "FOREX"
    | "INDICES"
    | "CRYPTO"
    | "COMMODITIES"
    | "STOCKS";

  direction:
    | "LONG"
    | "SHORT";

  trade_date: string;

  session?:
    | "ASIA"
    | "LONDON"
    | "NEW_YORK"
    | "OVERLAP";

  trade_bias?:
    | "BULLISH"
    | "BEARISH"
    | "NEUTRAL";

  account_balance?: number;

  risk_percent?: number;

  risk_amount?: number;

  entry_price?: number;

  stop_loss?: number;

  take_profit?: number;

  notes?: string;
}