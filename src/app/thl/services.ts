import { API_URL } from "@/constants";
import { Loan, Merchant } from "@/index";
import { formatErrorMessage } from "@/utils/util";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

export const useSetBrandId = () => {
  const { loansRefetch } = useGetLoans();
  const { merchantsRefetch } = useGetMerchants();
  const { data, error, mutateAsync, mutate, isLoading } = useMutation(
    async (payload: { brand_id: string }) => {
      const { data } = await axios.post(
        `${API_URL}/api/merchants/sync-merchant-brand-id`,
        payload
      );
      return data;
    },
    {
      onSuccess: (res) => {
        toast("Successfully set clickpesa offline reference", {
          duration: 5000,
          closeButton: true,
        });
        loansRefetch();
        merchantsRefetch();
      },
    }
  );
  return {
    setBrandId: mutate,
    setBrandIdAsync: mutateAsync,
    setBrandIdError: error,
    setBrandIdLoading: isLoading,
    setBrandIdData: data,
  };
};

export const useGetMerchants = () => {
  const { data, isLoading, error, refetch, isRefetching } = useQuery(
    ["merchants"],
    async () => {
      const { data } = await axios.get<{ merchants: Merchant[] }>(
        `${API_URL}/api/merchants`
      );
      return data;
    },
    {
      refetchOnMount: false,
      refetchInterval: 10000,
      refetchOnWindowFocus: false,
    }
  );
  return {
    merchants: data?.merchants,
    merchantsLoading: isLoading,
    merchantsError: error,
    merchantsRefetch: refetch,
    merchantsRefetching: isRefetching,
  };
};

export const useCreateLoan = () => {
  const { loansRefetch } = useGetLoans();
  const { data, error, mutateAsync, mutate, isLoading } = useMutation(
    async (payload: { amount: string; merchant: string; name: string }) => {
      const { data } = await axios.post(`${API_URL}/api/loans`, payload);
      return data;
    },
    {
      onSuccess: (res) => {
        toast("Successfully created a loan", {
          duration: 5000,
          closeButton: true,
        });
        loansRefetch();
      },
      onError: (error) => {
        toast(formatErrorMessage(error), {
          duration: 5000,
          closeButton: true,
        });
      },
    }
  );
  return {
    createLoan: mutate,
    createLoanAsync: mutateAsync,
    createLoanError: error,
    createLoanLoading: isLoading,
    createLoanData: data,
  };
};

export const useGetLoans = () => {
  const { data, isLoading, error, refetch, isRefetching } = useQuery(
    ["loans"],
    async () => {
      const { data } = await axios.get<{ loans: Loan[] }>(
        `${API_URL}/api/loans`
      );
      return data;
    },
    {
      refetchOnMount: false,
      refetchInterval: 10000,
      refetchOnWindowFocus: false,
    }
  );
  return {
    loans: data?.loans,
    loansLoading: isLoading,
    loansError: error,
    loansRefetch: refetch,
    loansRefetching: isRefetching,
  };
};

export const useUpdatePaymentsStatus = () => {
  const { loansRefetch } = useGetLoans();
  const { data, error, mutateAsync, mutate, isLoading } = useMutation(
    async () => {
      const { data } = await axios.post(`${API_URL}/api/loans/payments`, {});
      return data;
    },
    {
      onSuccess: (res) => {
        toast("Successfully updates loans", {
          duration: 5000,
          closeButton: true,
        });
        loansRefetch();
      },
      onError: (error) => {
        toast(formatErrorMessage(error), {
          duration: 5000,
          closeButton: true,
        });
      },
    }
  );
  return {
    updatePaymentsStatus: mutate,
    updatePaymentsStatusAsync: mutateAsync,
    updatePaymentsStatusError: error,
    updatePaymentsStatusLoading: isLoading,
    updatePaymentsStatusData: data,
  };
};
