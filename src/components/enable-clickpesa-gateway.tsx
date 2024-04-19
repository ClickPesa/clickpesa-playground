import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon } from "./Icons";
import { useSetBrandId } from "@/app/lms/services";
import { formatErrorMessage } from "@/utils/util";

const EnableClickpesaGateway = ({ close }: { close: () => void }) => {
  const [offlineReference, setOfflineReference] = useState("");
  const [apiKey, setApiKey] = useState("");
  const { setBrandIdLoading, setBrandIdError, setBrandId } = useSetBrandId();

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="api_key" className="sr-only">
          API Key
        </Label>
        <Input
          id="api_key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          readOnly={setBrandIdLoading}
          placeholder="Enter Your API Key"
        />
      </div>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="brand_id" className="sr-only">
            Brand ID
          </Label>
          <Input
            id="brand_id"
            value={offlineReference}
            onChange={(e) => setOfflineReference(e.target.value)}
            readOnly={setBrandIdLoading}
            placeholder="Enter Your Offline Reference"
          />
        </div>
        <Button
          type="submit"
          size="sm"
          className="px-3"
          disabled={setBrandIdLoading}
          onClick={() => {
            setBrandId({
              offlineReference,
              apiKey,
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
