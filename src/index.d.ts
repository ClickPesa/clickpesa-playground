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

export interface Payout {
  id: string;
  amount: string;
  currency: string;
  fee: string;
  channel: string;
  status: string;
  orderReference: string;
  channelProvider: string;
  settlementType?: string;
  note?: string;
  updatedAt?: string;
  createdAt?: string;
  beneficiary: {
    accountNumber: string;
    accountName: string;
    swiftNumber?: string;
    routingNumber?: string;
    beneficiaryMobileNumber?: string;
    beneficiaryEmail?: string;
  };
}

export interface Loan {
  payments: Payment[];
  payouts: Payout[];
  id: string;
  referenceID: string;
  name: string;
  merchantReference: string;
  amount: number;
  status: "PAID" | "PARTIAL_PAID" | "PENDING";
  disbursementStatus:
    | "PENDING"
    | "SUCCESS"
    | "REFUNDED"
    | "REVERSED"
    | "PROCESSING"
    | "INCOMPLETE"
    | "PARTIAL_PAID";
}

export interface Merchant {
  id: string;
  referenceID: string;
}
