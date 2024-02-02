"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircleIcon, ErrorIcon } from "./Icons"
import { useState } from "react";
import SetCallbackURL from "./SetCallbackURL";
import { Separator } from "./ui/separator";

const formatAmount = (inputAmount: string) => {
  const numericValue = parseFloat(inputAmount);
  const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'TZS' }).format(numericValue); // Divide by 100 to adjust decimal place
  return formattedAmount;
};
export function BillPayHome() {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [showLogs, setShowLogs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null as any);
  const [simulationResults, setSimulationResults] = useState(null as any);

  const handleReferenceNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceNumber(event.target.value);
    setError('');
    setErrorInfo(null);
    simulationResults(null)
  };


  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = event.target.value || "0"
    if (!/^\d+$/.test(inputAmount)) {
      return
    }
    setAmount(inputAmount);
    setError('');
    setErrorInfo(null);
    simulationResults(null)
  };


  const handleSimulatePaymentClick = () => {
    if (!referenceNumber || !amount) {
      setError('Please enter both reference number and amount');
    } else {
      setError('');
      setShowLogs(true)
      setIsLoading(true);
      setErrorInfo(null);
      submitPayload();
    }
  };


  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/2 ">
        <div className="mb-auto p-8 space-y-4">
          <div className="font-bold text-2xl">BillPay Simulator</div>
          <Input placeholder="Reference Number" value={referenceNumber} name="referenceNumber" onChange={handleReferenceNumberChange} />
          <Input placeholder="Amount" type="text" value={amount} name="amount" onChange={handleAmountChange} />
          {error && <div className="text-red-500">{error}</div>}
          <Button onClick={handleSimulatePaymentClick} disabled={!referenceNumber || !amount || isLoading} >Simulate Payment</Button>
        </div>
        <Separator className="" />
        <div className="flex h-10 items-center space-x-4 text-sm">
        <SetCallbackURL />
        </div>
      </div>
      <div className="w-1/2 bg-[#1E1E2D] p-8">
        {showLogs &&
          <>
            <div className="mb-4 p-4 bg-[#24243B] text-white rounded">
              <CheckCircleIcon className="text-green-500 mr-2" />
              Entered Reference: {referenceNumber}{"\n          "}
            </div>
            <div className="mb-4 p-4 bg-[#24243B] text-white rounded">
              <CheckCircleIcon className="text-green-500 mr-2" />
              Entered Amount: {formatAmount(amount)}{"\n          "}
            </div>
            {isLoading && <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin h-8 w-8 border-t-2 border-white-900 rounded-full" />
              <p className="text-sm text-white-500 dark:text-white-500">Loading...</p>
            </div>}
            {errorInfo && <div className="mb-4 p-4 bg-[#24243B] text-white rounded">
              <ErrorIcon className="text-red-500 mr-2" />
              {errorInfo?.errors ? errorInfo?.errors?.map((error: string) => <div key={error}>Error: {error} {"\n          "}</div>) : <div>Error: {errorInfo.message} {"\n          "}</div>}
            </div>}
            {simulationResults && !isLoading && <div className="mb-4 p-4 bg-[#24243B] text-white rounded">
              <CheckCircleIcon className="text-green-500 mr-2" />
              Payment Results.. {"\n          "}
              <div className="mt-2 p-2 bg-[#2D2D3A] rounded">
                <p className="text-md">Message: Payment {simulationResults?.message}</p>
                <p className="text-md">Transaction-ID: {simulationResults?.transactionId}</p>
              </div>
            </div>}
          </>
        }
      </div>
    </div>
  )

  async function submitPayload() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BILL_PAY_SIMULATION_ENDPOINT as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ billReference: referenceNumber, amount: +amount }),
      });
      const data = await response.json()
      if (!response.ok) {
        setErrorInfo(data);
        setIsLoading(false);
        return
      }
      setAmount('');
      setIsLoading(false);
      setSimulationResults(data)
    } catch (error) {
      console.error('Error simulating payment:', JSON.stringify(error, null, 2));
      setIsLoading(false);
    }
  }
}


