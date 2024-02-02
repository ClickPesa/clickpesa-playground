import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRightIcon, CogIcon } from "./Icons"


export default function SetCallbackURL() {
  const [callbackUrl, setCallbackUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSetClick = async () => {
    if (!callbackUrl) {
      setError('Callback URL cannot be empty');
      return;
    }
    setLoading(true);
    try {
      let url = process.env.NEXT_PUBLIC_SET_EVENTS_CALLBACK_URL_ENDPOINT || "";
      let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"callback_url":"' + callbackUrl + '"}'
      };
      fetch(url, options)
        .then(res => res.json())
        .then(json => {
          setLoading(false);
          if (json?.events_callback_url) {
            toast("Set Callback URL", {
              description: json.message,
            })
            return setCallbackUrl(json.events_callback_url)
          }
          setError(json.message)
        })
        .catch(err => console.error('Error 🚨:' + err));
    } catch (error) {
      console.error(error);
      setLoading(false);
      setCallbackUrl('')
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCallbackUrl(e.target.value);
  };

  const handleInputFocus = () => {
    setError(''); // Clear the error when the input is focused
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="font-bold" >
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
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              value={callbackUrl}
              onChange={handleInputChange}
              readOnly={loading}
              onFocus={handleInputFocus}
            />
          </div>
          <Button type="submit" size="sm" className="px-3" disabled={loading}
            onClick={handleSetClick}>
            <span className="sr-only">Set</span>
            {loading ? <div className="animate-spin h-4 w-4 border-t-2 border-white-900 rounded-full" /> : <ArrowRightIcon className="h-4 w-4" />}
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
