import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon } from "./Icons";
import { useGetMerchant } from "@/app/lms/services";
import { formatErrorMessage } from "@/utils/util";

const EnableClickpesaGateway = ({}: { close: () => void }) => {
  const [apiKey, setApiKey] = useState("");
  const [clientId, setClientId] = useState("");
  const { setBrandIdLoading, setBrandIdError, setBrandId } = useGetMerchant();

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="client_id">Client ID</Label>
        <Input
          id="client_id"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          readOnly={setBrandIdLoading}
          placeholder="Enter Your Client ID"
        />
      </div>

      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <Label htmlFor="api_key">API Key</Label>
          <Input
            id="api_key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            readOnly={setBrandIdLoading}
            placeholder="Enter Your API Key"
          />
        </div>
        <Button
          type="submit"
          size="sm"
          className="px-3"
          disabled={setBrandIdLoading}
          onClick={() => {
            setBrandId({
              apiKey,
              clientId,
            });
          }}
        >
          <span className="sr-only">Set</span>
          {setBrandIdLoading ? (
            <div className="animate-spin h-4 w-4 border-t-2 border-white-900 rounded-full" />
          ) : (
            <ArrowRightIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
      {setBrandIdError ? (
        <p className="text-red-500 text-sm">
          {formatErrorMessage(setBrandIdError)}
        </p>
      ) : null}
    </div>
  );
};

export default EnableClickpesaGateway;
