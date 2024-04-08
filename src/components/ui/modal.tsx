import React, { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Modal = ({
  open,
  close,
  children,
  footer,
  title,
  titleDescription,
}: {
  open: boolean;
  close: () => void;
  children: ReactNode;
  footer?: ReactNode;
  title?: ReactNode;
  titleDescription?: ReactNode;
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          close();
        }
      }}
    >
      <DialogContent className="sm:max-w-md overflow-y-auto max-h-[80dvh]">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {titleDescription && (
            <DialogDescription>{titleDescription}</DialogDescription>
          )}
        </DialogHeader>
        {children}
        {footer && (
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>{footer}</DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
