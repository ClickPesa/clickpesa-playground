export interface Payment {
  id: string;
  status: string;
  paymentReference: string;
  orderReference: string;
  collectedAmount: string;
  collectedCurrency: string;
  message: string;
  customer?: {
    customerName: string;
    customerPhoneNumber?: string;
    customerEmail?: string;
  };
  updatedAt?: string;
  createdAt?: string;
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
