"use client";

import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import Tiptap from "@/components/tiptap/tiptap";
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

export const NewThought = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.altKey || event.metaKey) &&
        event.shiftKey &&
        event.key === "T"
      ) {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <form>
        <DialogTrigger asChild>
          <Button className="p-0" variant="link">
            <SquarePen className="min-h-5 min-w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-1/2">
          <DialogHeader>
            <DialogTitle>Yo</DialogTitle>
            <DialogDescription>What u think</DialogDescription>
          </DialogHeader>
          <Tiptap
            autofocus
            className="min-h-40 text-lg w-full h-full overflow-hidden"
            placeholder="Type something..."
            showCharCount
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
