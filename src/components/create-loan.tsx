import { useCreateLoan, useGetMerchants } from "@/app/lms/services";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "./Icons";

const CreateLoan = ({ close }: { close: () => void }) => {
  const { merchants, merchantsLoading } = useGetMerchants();
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const { createLoanAsync, createLoanLoading } = useCreateLoan();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
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

  if (merchantsLoading) {
    return (
      <div className="flex justify-center h-24 items-center w-full">
        <div className="animate-spin h-8 w-8 border-t-2 border-neutral-500 rounded-full" />
      </div>
    );
  }

  if (!merchants?.length) {
    return <div>Clickpesa must be enabled for atleast one merchant</div>;
  }

  if (!merchant) {
    return (
      <div>
        <h3 className="mb-3">Select Merchant By reference</h3>
        <ul className="space-y-4">
          {merchants?.map((merchant) => {
            return (
              <li
                className="bg-neutral-100 rounded-lg p-2 cursor-pointer"
                onClick={() => setMerchant(merchant?.referenceID)}
                key={merchant?.referenceID}
              >
                {merchant?.referenceID}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p>Offline Reference: {merchant}</p>
      <Input
        placeholder="Loan Name"
        value={name}
        name="name"
        onChange={handleNameChange}
      />
      <div className="flex items-center gap-2">
        <Input
          placeholder="Amount"
          type="text"
          value={amount}
          name="amount"
          onChange={handleAmountChange}
        />
        <Button
          type="submit"
          size="sm"
          className="px-3"
          disabled={createLoanLoading}
          onClick={() => {
            if (!merchant || !name || !amount) {
              return setError("Fields are missing");
            }
            createLoanAsync({
              merchant,
              amount,
              name,
            }).then((res) => {
              if (res?.payout?.payoutLink) {
                const newTab = window.open(
                  res?.payout?.payoutLink +
                    "&returnUrl=" +
                    window.location.origin,
                  "_blank"
                );
                newTab?.focus();
              } else {
                close();
              }
            });
          }}
        >
          <span className="sr-only">Set</span>
          {createLoanLoading ? (
            <div className="animate-spin h-4 w-4 border-t-2 border-white-900 rounded-full" />
          ) : (
            <ArrowRightIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CreateLoan;
