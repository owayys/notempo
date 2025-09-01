import { SquarePen } from "lucide-react";
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
import { ThoughtEditor } from "./thought-editor";

export const NewThought = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="link">
            <SquarePen />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-1/2">
          <DialogHeader>
            <DialogTitle>Yo</DialogTitle>
            <DialogDescription>What u think</DialogDescription>
          </DialogHeader>
          <ThoughtEditor />
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
