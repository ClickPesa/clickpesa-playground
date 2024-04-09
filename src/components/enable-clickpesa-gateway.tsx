import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon } from "./Icons";
import { useSetBrandId } from "@/app/lms/services";
import { formatErrorMessage } from "@/utils/util";

const EnableClickpesaGateway = ({ close }: { close: () => void }) => {
  const [brand_id, set_brand_id] = useState("");
  const { setBrandIdLoading, setBrandIdError, setBrandId } = useSetBrandId();

  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="brand_id" className="sr-only">
            Brand ID
          </Label>
          <Input
            id="brand_id"
            value={brand_id}
            onChange={(e) => set_brand_id(e.target.value)}
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
              brand_id,
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
    </>
  );
};

export default EnableClickpesaGateway;
