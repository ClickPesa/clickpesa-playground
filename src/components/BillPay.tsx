"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircleIcon, ErrorIcon } from "./Icons"
import { useState } from "react";

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
    setError(''); setErrorInfo(null);
  };


  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = event.target.value || "0"
    if (!/^\d+$/.test(inputAmount)) {
      return
    }
    setAmount(inputAmount);
    setError('');
    setErrorInfo(null);
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
      <div className="flex flex-col w-1/2 p-8 space-y-4">
        <div className="font-bold text-2xl">BillPay Simulator</div>
        <Input placeholder="Reference Number" value={referenceNumber} name="referenceNumber" onChange={handleReferenceNumberChange} />
        <Input placeholder="Amount" type="text" value={amount} name="amount" onChange={handleAmountChange} />
        {error && <div className="text-red-500">{error}</div>}
        <Button onClick={handleSimulatePaymentClick} disabled={!referenceNumber || !amount} >Simulate Payment</Button>

      </div>
      <div className="w-1/2 bg-[#1E1E2D] p-8 overflow-y-auto">
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
            {isLoading && <div>Loading...</div>}
            {errorInfo && <div className="mb-4 p-4 bg-[#24243B] text-white rounded">
              <ErrorIcon className="text-red-500 mr-2" />
              {errorInfo?.errors ? errorInfo?.errors?.map((error: string) => <div key={error}>Error: {error} {"\n          "}</div>) : <div>Error: {errorInfo.message} {"\n          "}</div>}
            </div>}
            {simulationResults && <div className="mb-4 p-4 bg-[#24243B] text-white rounded">
              <CheckCircleIcon className="text-green-500 mr-2" />
              Results: {"\n          "}
              {simulationResults}
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
      console.log('Payment simulation successful:', data);
      setIsLoading(false); // Set loading status to false after API call is complete
      setSimulationResults(data)
    } catch (error) {
      console.error('Error simulating payment:', JSON.stringify(error, null, 2));
      setIsLoading(false);
    }
  }
}


