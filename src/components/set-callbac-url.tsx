import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon, CogIcon } from "./Icons";
import { useSetBrandId } from "@/app/lms/services";
import { formatErrorMessage } from "@/utils/util";

export default function SetCallbackURL({
  onReferenceChange,
}: {
  onReferenceChange: (reference: string) => void;
}) {
  const [callbackUrl, setCallbackUrl] = useState("");
  const [offlineReference, setOfflineReference] = useState("");

  const { setBrandIdAsync, setBrandIdLoading, setBrandIdError } =
    useSetBrandId();

  const handleSetClick = () => {
    setBrandIdAsync({
      offlineReference,
      callbackUrl,
    }).then(() => {
      onReferenceChange(offlineReference);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="font-bold">
          <CogIcon className="mr-1 h-4 w-4" />
          Configuration
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Callback URL</DialogTitle>
          <DialogDescription>
            Set a webhook URL to receive payment events notifications.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="offlineRefence" className="">
            Offline Reference
          </Label>
          <Input
            id="offlineRefence"
            value={offlineReference}
            onChange={(e) => setOfflineReference(e.target.value)}
            readOnly={setBrandIdLoading}
          />
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="">
              Callback URL
            </Label>
            <Input
              id="link"
              value={callbackUrl}
              onChange={(e) => {
                setCallbackUrl(e.target.value);
              }}
              readOnly={setBrandIdLoading}
            />
          </div>
        </div>
        <Button
          type="submit"
          size="sm"
          className="px-3 gap-2"
          disabled={setBrandIdLoading}
          onClick={handleSetClick}
        >
          <span className="sr-only">Set</span>
          {setBrandIdLoading ? (
            <div className="animate-spin h-4 w-4 border-t-2 border-white-900 rounded-full" />
          ) : (
            <>
              Submit
              <ArrowRightIcon className="h-4 w-4" />
            </>
          )}
        </Button>
        {setBrandIdError ? (
          <p className="text-red-500 text-sm">
            {formatErrorMessage(setBrandIdError)}
          </p>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
