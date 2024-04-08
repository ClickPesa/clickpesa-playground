export const formatErrorMessage = (error: any): string => {
  return error?.response?.data?.message || error?.message;
};
