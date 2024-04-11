import React, { useState } from "react";
import { Loan } from "..";
import { Button } from "./ui/button";
import Modal from "./ui/modal";

const LoanItem = ({
  loan,
  onSimmulate,
}: {
  loan: Loan;
  onSimmulate: () => void;
}) => {
  const [viewPayments, setViewPayments] = useState(false);
  return (
    <div className="border rounded mb-3 p-3 flex items-end gap-4 justify-between">
      <div className="flex flex-col text-sm gap-1">
        <span>Name: {loan?.name}</span>
        <span>Amount: {loan?.amount} TZS</span>
        <span>Reference: {loan?.referenceID}</span>
        <span>Merchant: {loan?.merchantReference}</span>
        <span>Status: {loan?.status}</span>
        <span>Received Payments: {loan?.payments?.length}</span>
        {loan?.payments?.length ? (
          <button
            className="px-0 text-left text-sm text-blue-500 mt-2"
            onClick={() => {
              setViewPayments(true);
            }}
          >
            View Payments
          </button>
        ) : null}
      </div>
      <div>
        <Button onClick={onSimmulate}>Simulate Payment</Button>
      </div>
      <Modal
        open={viewPayments}
        close={() => setViewPayments(false)}
        title={`Loan ${loan?.name} Received Payments`}
      >
        <div>
          {loan?.payments?.map((payment) => {
            return (
              <div
                className="border rounded p-2 flex flex-col gap-1 mb-2"
                key={payment?.id}
              >
                <span>ID: {payment?.id}</span>
                <span>Status: {payment?.status}</span>
                <span>
                  Amount: {payment?.collectedAmount}{" "}
                  {payment?.collectedCurrency}
                </span>
                <span>Order Reference: {payment?.orderReference}</span>
                <span>Message: {payment?.message}</span>
                {payment?.createdAt && (
                  <span>Initiated: {formatDate(payment?.createdAt)}</span>
                )}
                {payment?.updatedAt && (
                  <span>Updated: {formatDate(payment?.updatedAt)}</span>
                )}
                {payment?.customer && (
                  <>
                    {payment?.customer?.customerName && (
                      <span>
                        Customer Name: {payment?.customer?.customerName}
                      </span>
                    )}
                    {payment?.customer?.customerEmail && (
                      <span>
                        Customer Email: {payment?.customer?.customerEmail}
                      </span>
                    )}
                    {payment?.customer?.customerPhoneNumber && (
                      <span>
                        Customer Phone: {payment?.customer?.customerPhoneNumber}
                      </span>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export default LoanItem;
