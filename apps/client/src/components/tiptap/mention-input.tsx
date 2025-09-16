import { Loader, Plus } from "lucide-react";
import type { KeyboardEventHandler } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Separator } from "../ui";

export type Item = {
  id: string;
  label: string;
};

interface MentionInputProps {
  position: { top: number; left: number } | null;

  open: boolean;
  setOpen: (state: boolean) => void;

  inputHook: KeyboardEventHandler;

  query: string;
  setQuery: (query: string) => void;
  queryLoading: boolean;

  items: Item[];
  selectItem: (item: Item) => void;

  createItem: (label: Item["label"]) => Promise<void> | void;
  creationPending: boolean;
}

export const MentionInput = ({
  position,
  open,
  setOpen,
  inputHook,
  query,
  setQuery,
  queryLoading,
  items,
  selectItem,
  createItem,
  creationPending,
}: MentionInputProps) => {
  const renderCreateItem =
    (!items.some((i) => i.label.toLowerCase() === query.trim().toLowerCase()) ||
      items.length === 0) &&
    !queryLoading;

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverContent
        align="start"
        className="w-56 p-0"
        side="bottom"
        style={{
          position: "absolute",
          top: position?.top,
          left: position?.left,
        }}
      >
        <Command>
          <CommandInput
            onKeyDown={inputHook}
            onValueChange={setQuery}
            placeholder="Search concept"
          />
          <CommandList>
            <CommandGroup forceMount title="Actions">
              {renderCreateItem && (
                <CommandItem forceMount onSelect={createItem} value={query}>
                  {creationPending ? (
                    <>
                      <Loader className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus />
                      Create
                    </>
                  )}
                </CommandItem>
              )}
              {queryLoading && (
                <CommandItem forceMount>
                  <Loader className="animate-spin" />
                  Searching...
                </CommandItem>
              )}
            </CommandGroup>
            <Separator />
            <CommandGroup title="Options">
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => selectItem(item)}
                  value={`${item.label} ${item.id}`}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
