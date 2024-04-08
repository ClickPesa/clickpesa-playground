"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useGetLoans, useUpdatePaymentsStatus } from "./services";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import EnableClickpesaGateway from "@/components/enable-clickpesa-gateway";
import Modal from "@/components/ui/modal";
import CreateLoan from "@/components/create-loan";
import LoanItem from "@/components/loan-item";
import { Loan } from "@/index";
import { BillPayHome } from "@/components/bill-pay";

const Page = () => {
  const [openEnableClickpesa, setOpenEnableClickpesa] = useState(false);
  const [loanToSimulate, setLoanToSimulate] = useState<Loan | null>(null);
  const [openCreateLoan, setOpenCreateLoan] = useState(false);
  const { updatePaymentsStatus, updatePaymentsStatusLoading } =
    useUpdatePaymentsStatus();
  const { loans, loansLoading, loansRefetching, loansRefetch } = useGetLoans();

  if (loanToSimulate) {
    return (
      <BillPayHome
        defaultAmount={loanToSimulate?.amount.toString()}
        defaultReference={loanToSimulate?.referenceID}
        cb={() => {
          loansRefetch();
          setLoanToSimulate(null);
        }}
      />
    );
  }

  return (
    <div className="container max-w-[800px]">
      <div className="border-b flex justify-between items-center gap-4 py-4">
        <h1 className="font-bold text-4xl">THL</h1>
        <div className="flex gap-3 items-center">
          <Button
            variant={"outline"}
            size={"sm"}
            disabled={updatePaymentsStatusLoading || loansRefetching}
            onClick={() => updatePaymentsStatus()}
          >
            <RefreshCcw
              size={18}
              className={cn(
                loansRefetching || updatePaymentsStatusLoading
                  ? "animate-spin"
                  : ""
              )}
            />
          </Button>
          <Button
            size={"sm"}
            onClick={() => {
              setOpenEnableClickpesa(true);
            }}
          >
            Enable ClickPesa Gateway
          </Button>
        </div>
      </div>
      <div className="py-4">
        <div className="flex justify-between gap-3 items-center">
          <h2 className="font-bold text-lg">Loans</h2>
          <Button variant={"secondary"} onClick={() => setOpenCreateLoan(true)}>
            Create Loan
          </Button>
        </div>
      </div>
      {loansLoading && (
        <div className="flex justify-center h-24 items-center w-full">
          <div className="animate-spin h-8 w-8 border-t-2 border-neutral-500 rounded-full" />
        </div>
      )}
      {!loans?.length && !loansLoading ? (
        <div className="flex flex-col items-center gap-3 h-24 justify-center">
          <p>You haven't created any loan yet</p>
          <Button onClick={() => setOpenCreateLoan(true)}>Create</Button>
        </div>
      ) : null}
      {loans?.map((loan) => {
        return (
          <LoanItem
            loan={loan}
            key={loan?.referenceID}
            onSimmulate={() => {
              setLoanToSimulate(loan);
            }}
          />
        );
      })}
      <Modal
        open={openEnableClickpesa}
        close={() => setOpenEnableClickpesa(false)}
        footer={
          <Button type="button" variant="secondary">
            Close
          </Button>
        }
        title="Enable Clickpesa Payment Gateway"
        titleDescription="Set your clickpesa offline reference"
      >
        {openEnableClickpesa && (
          <EnableClickpesaGateway close={() => setOpenEnableClickpesa(false)} />
        )}
      </Modal>
      <Modal
        open={openCreateLoan}
        close={() => setOpenCreateLoan(false)}
        footer={
          <Button type="button" variant="secondary">
            Close
          </Button>
        }
        title="Create Loan"
      >
        {openCreateLoan && (
          <CreateLoan close={() => setOpenCreateLoan(false)} />
        )}
      </Modal>
    </div>
  );
};

export default Page;
