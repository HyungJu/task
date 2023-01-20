export type UpsertExchangeRateCommand = {
  from: string;
  to: string;
  rate: number;
  date?: string;
};
