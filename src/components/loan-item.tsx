import React, { useState } from "react";
import { Loan } from "..";
import { Button } from "./ui/button";
import Modal from "./ui/modal";
import { useGeneratePayoutLink } from "@/app/lms/services";

const LoanItem = ({
  loan,
  onSimmulate,
}: {
  loan: Loan;
  onSimmulate: () => void;
}) => {
  const [viewPayments, setViewPayments] = useState(false);
  const [viewPayouts, setViewPayouts] = useState(false);

  const { generatePayoutLinkAsync, generatePayoutLinkLoading } =
    useGeneratePayoutLink();

  return (
    <div className="border rounded mb-3 p-3 flex items-end gap-4 justify-between">
      <div className="flex flex-col text-sm gap-1">
        <span>Name: {loan?.name}</span>
        <span>Amount: {loan?.amount} TZS</span>
        <span>Reference: {loan?.referenceID}</span>
        <span>Merchant: {loan?.merchantReference}</span>
        <span>Status: {loan?.status}</span>
        <span>Disbursement Status: {loan?.disbursementStatus}</span>
        <span>Received Payments: {loan?.payments?.length}</span>
        <div className="flex gap-5 items-center">
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
          {loan?.payouts?.length ? (
            <button
              className="px-0 text-left text-sm text-blue-500 mt-2"
              onClick={() => {
                setViewPayouts(true);
              }}
            >
              View Payouts
            </button>
          ) : null}
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={onSimmulate}>Simulate Payment</Button>
        {loan?.disbursementStatus !== "SUCCESS" && (
          <Button
            onClick={() => {
              generatePayoutLinkAsync(loan?.id);
            }}
            variant={"secondary"}
          >
            Payout
          </Button>
        )}
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
      <Modal
        open={viewPayouts}
        close={() => setViewPayouts(false)}
        title={`Loan ${loan?.name} Disbursements`}
      >
        <div>
          {loan?.payouts?.map((payout) => {
            return (
              <div
                className="border rounded p-2 flex flex-col gap-1 mb-2"
                key={payout?.id}
              >
                <span>ID: {payout?.id}</span>
                <span>Status: {payout?.status}</span>
                <span>
                  Amount: {payout?.amount} {payout?.currency}
                </span>
                <span>
                  Fee: {payout?.fee} {payout?.currency}
                </span>
                <span>Order Reference: {payout?.orderReference}</span>
                {payout?.note && <span>Note: {payout?.note}</span>}
                {payout?.createdAt && (
                  <span>Initiated: {formatDate(payout?.createdAt)}</span>
                )}
                {payout?.updatedAt && (
                  <span>Updated: {formatDate(payout?.updatedAt)}</span>
                )}
                {payout?.beneficiary && (
                  <>
                    {payout?.beneficiary?.accountNumber && (
                      <span>
                        Account Number: {payout?.beneficiary?.accountNumber}
                      </span>
                    )}
                    {payout?.beneficiary?.accountName && (
                      <span>
                        Account Name: {payout?.beneficiary?.accountName}
                      </span>
                    )}
                    {payout?.beneficiary?.beneficiaryMobileNumber && (
                      <span>
                        Beneficiary Phone:{" "}
                        {payout?.beneficiary?.beneficiaryMobileNumber}
                      </span>
                    )}
                    {payout?.beneficiary?.beneficiaryEmail && (
                      <span>
                        Beneficiary Email:{" "}
                        {payout?.beneficiary?.beneficiaryEmail}
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
