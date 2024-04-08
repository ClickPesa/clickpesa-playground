export interface Payment {
  id: string;
  payment_id: string;
  status: string;
  paymentReference: string;
  order_reference: string;
  receipt?: string;
  amount: string;
  currency: string;
  message: string;
  created_at: string;
  last_updated?: string;
  customer: { customerName: string; customerPhoneNumber: string };
}

export interface Loan {
  payments: Payment[];
  id: string;
  referenceID: string;
  name: string;
  merchantReference: string;
  amount: number;
  status: "PAID" | "PARTIAL_PAID" | "PENDING";
}

export interface Merchant {
  id: string;
  referenceID: string;
}
