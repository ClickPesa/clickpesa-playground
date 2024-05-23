"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, ErrorIcon } from "./Icons";
import { useState } from "react";
import SetCallbackURL from "./set-callbac-url";
import { Separator } from "./ui/separator";
import { useSimulateBillpay } from "@/service/billpay";
import { formatErrorMessage } from "@/utils/util";

export const formatAmount = (inputAmount: string) => {
  const numericValue = parseFloat(inputAmount);
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TZS",
  }).format(numericValue); // Divide by 100 to adjust decimal place
  return formattedAmount;
};
export function BillPayHome({
  cb,
  defaultAmount,
  defaultReference,
}: {
  cb?: () => void;
  defaultAmount?: string;
  defaultReference?: string;
}) {
  const {
    simulateBillPayAsync,
    simulateBillPayLoading,
    simulateBillPayError,
    simulateBillPayData,
  } = useSimulateBillpay(cb);
  const [billReference, setBillReference] = useState(defaultReference || "");
  const [amount, setAmount] = useState(defaultAmount || "");
  const [error, setError] = useState("");
  const [showLogs, setShowLogs] = useState(false);

  const handleReferenceNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBillReference(event.target.value);
    setError("");
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = event.target.value || "0";
    if (!/^\d+$/.test(inputAmount)) {
      return;
    }
    setAmount(inputAmount);
    setError("");
  };

  const handleSimulatePaymentClick = () => {
    if (!billReference || !amount) {
      setError("Please enter both reference number and amount");
    } else {
      setError("");
      setShowLogs(true);
      simulateBillPayAsync({
        amount: +amount,
        billReference,
      });
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/2 ">
        <div className="mb-auto p-8 space-y-4">
          <div className="font-bold text-2xl">BillPay Simulator</div>
          <Input
            placeholder="Reference Number"
            value={billReference}
            name="billReference"
            onChange={handleReferenceNumberChange}
          />
          <Input
            placeholder="Amount"
            type="text"
            value={amount}
            name="amount"
            onChange={handleAmountChange}
          />
          {error && <div className="text-red-500">{error}</div>}
          <Button
            onClick={handleSimulatePaymentClick}
            disabled={!billReference || !amount || simulateBillPayLoading}
          >
            Simulate Payment
          </Button>
        </div>
        {/* <Separator className="" />
        {!defaultReference && (
          <div className="flex h-10 items-center space-x-4 text-sm">
            <SetCallbackURL
              onReferenceChange={(e) => {
                setBillReference(e);
              }}
            />
          </div>
        )} */}
      </div>
      <div className="w-1/2 bg-[#1E1E2D] p-8">
        {showLogs && (
          <>
            <div className="mb-4 p-4 bg-[#24243B] text-white rounded">
              <CheckCircleIcon className="text-green-500 mr-2" />
              Entered Reference: {billReference}
              {"\n          "}
            </div>
            <div className="mb-4 p-4 bg-[#24243B] text-white rounded">
              <CheckCircleIcon className="text-green-500 mr-2" />
              Entered Amount: {formatAmount(amount)}
              {"\n          "}
            </div>
            {simulateBillPayLoading && (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin h-8 w-8 border-t-2 border-white-900 rounded-full" />
                <p className="text-sm text-white-500 dark:text-white-500">
                  Loading...
                </p>
              </div>
            )}
            {simulateBillPayError && (
              <div className="mb-4 p-4 bg-[#24243B] text-white rounded">
                <ErrorIcon className="text-red-500 mr-2" />
                {/* @ts-ignore */}
                {simulateBillPayError?.errors ? (
                  // @ts-ignore
                  simulateBillPayError?.errors?.map((error: string) => (
                    <div key={error}>
                      Error: {error} {"\n          "}
                    </div>
                  ))
                ) : (
                  <div>
                    Error: {formatErrorMessage(simulateBillPayError)}{" "}
                    {"\n          "}
                  </div>
                )}
              </div>
            )}
            {simulateBillPayData && !simulateBillPayLoading && (
              <div className="mb-4 p-4 bg-[#24243B] text-white rounded">
                <CheckCircleIcon className="text-green-500 mr-2" />
                Payment Results.. {"\n          "}
                <div className="mt-2 p-2 bg-[#2D2D3A] rounded">
                  <p className="text-md">
                    Message: Payment {simulateBillPayData?.message}
                  </p>
                  <p className="text-md">
                    Transaction-ID: {simulateBillPayData?.transactionId}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
