export type ModeType = "term" | "holiday";

export interface WorkShift {
  id: string;
  date: string;
  hours: number;
  location: string;
}

export interface Debt {
  id: string;
  name: string;
  amount: number;
  currency: string;
  type: "gbp" | "foreign";
  originalAmount?: number;
  exchangeRate?: number;
}

export interface Budget {
  monthlyIncome: number;
  rent: number;
  bills: number;
  tuition: number;
  visaBuffer: number;
  debtRepayment: number;
}
