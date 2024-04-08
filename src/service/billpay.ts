import { SIMULATE_BILLPAY_API_URL } from "@/constants";
import axios from "axios";
import { useMutation } from "react-query";

interface BillPayPayload {
  amount: number;
  billReference: string;
}

export const useSimulateBillpay = (cb?: () => void) => {
  const { data, error, mutateAsync, mutate, isLoading } = useMutation(
    async (payload: BillPayPayload) => {
      const { data } = await axios.post(`${SIMULATE_BILLPAY_API_URL}`, payload);
      return data;
    },
    {
      onSuccess: () => {
        cb?.();
      },
    }
  );
  return {
    simulateBillPay: mutate,
    simulateBillPayAsync: mutateAsync,
    simulateBillPayError: error,
    simulateBillPayLoading: isLoading,
    simulateBillPayData: data,
  };
};
