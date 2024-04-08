"use client";
import React, { ReactNode } from "react";

import { QueryClientProvider, QueryClient } from "react-query";

const queryCient = new QueryClient();

const LayoutWithQuery = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryCient}>{children}</QueryClientProvider>
  );
};

export default LayoutWithQuery;
