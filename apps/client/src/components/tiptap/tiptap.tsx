"use client";
import Mention from "@tiptap/extension-mention";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import {
  EditorContent,
  type EditorOptions,
  type Range,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { SmartBraces } from "@/components/tiptap/tiptap-extensions";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Box } from "@/components/ui/layout";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface EditorProps {
  content?: EditorOptions["content"];
  className?: string;
  autofocus?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  showCharCount?: boolean;
}

const CHARACTER_LIMIT = 512;

const mockItems = [
  { id: "1", label: "John Doe", value: "john" },
  { id: "2", label: "Jane Smith", value: "jane" },
  { id: "3", label: "Bob Johnson", value: "bob johnson" },
];

const Tiptap = ({
  content,
  className,
  placeholder = "Write something...",
  autofocus = false,
  onFocus,
  onBlur,
  showCharCount = false,
}: EditorProps) => {
  const [suggestionItems, setSuggestionItems] = useState<
    {
      id: string;
      label: string;
      value: string;
      range: Range;
    }[]
  >([]);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      CharacterCount.configure({
        limit: CHARACTER_LIMIT,
        mode: "textSize",
      }),
      SmartBraces,
      Mention.configure({
        HTMLAttributes: {
          class: "px-1 py-0.5 rounded bg-muted text-primary",
        },
        suggestion: {
          items: ({ query }) =>
            mockItems
              .filter((item) =>
                item.label.toLowerCase().includes(query.toLowerCase()),
              )
              .slice(0, 5),
          render: () => {
            return {
              onStart: (props) => {
                setSuggestionItems(
                  props.items.map((it) => ({ ...it, range: props.range })),
                );
                setOpen(props.items.length > 0);
                const rect = props.clientRect?.();
                if (rect) {
                  setPosition({
                    top: rect.bottom + window.scrollY,
                    left: rect.left + window.scrollX,
                  });
                }
              },
              onUpdate: (props) => {
                setSuggestionItems(
                  props.items.map((it) => ({ ...it, range: props.range })),
                );
                setOpen(props.items.length > 0);
                const rect = props.clientRect?.();
                if (rect) {
                  setPosition({
                    top: rect.bottom + window.scrollY,
                    left: rect.left + window.scrollX,
                  });
                }
              },
              onKeyDown: (props) => {
                if (props.event.key === "Escape") {
                  setOpen(false);
                  return true;
                }
                return false;
              },
              onExit: () => {
                setOpen(false);
                setSuggestionItems([]);
                setPosition(null);
              },
            };
          },
        },
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none h-full min-h-full",
      },
    },
    autofocus,
  });

  const editorState = useEditorState({
    editor,
    selector: (context) => ({
      charCount: context.editor?.storage.characterCount.characters(),
    }),
  });

  const remainingChars = CHARACTER_LIMIT - (editorState?.charCount ?? 0);

  return (
    <Box className={cn("h-full relative", className)}>
      <EditorContent
        className="font-atkinson h-full [&_.ProseMirror]:h-full [&_.ProseMirror]:min-h-full"
        editor={editor}
        onBlur={() => (open ? null : onBlur?.())}
        onFocus={onFocus}
      />
      <Typography
        className={`${
          showCharCount ? "opacity-100" : "opacity-0"
        } absolute -bottom-3 right-0 transition-all duration-250 pointer-events-none px-3 py-2 ${
          remainingChars < 50
            ? "text-destructive text-base"
            : remainingChars < 100
            ? "text-amber-500 text-sm"
            : "text-primary text-xs"
        }`}
        variant="muted"
      >
        {remainingChars}
      </Typography>

      {/* Popover for mentions */}
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
              onKeyDown={(event) => {
                if (event.key === "Backspace") {
                  const input = event.currentTarget as HTMLInputElement;
                  if (!input.value) {
                    editor?.commands.focus("end");
                    setOpen(false);
                  }
                }
              }}
              placeholder="Search user..."
            />
            <CommandList>
              <CommandGroup>
                {suggestionItems.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => {
                      editor?.commands.insertContentAt(item.range, [
                        {
                          type: "mention",
                          attrs: { id: item.id, label: item.label },
                        },
                        { type: "text", text: " " },
                      ]);
                      editor?.commands.focus("end");
                      setOpen(false);
                    }}
                    value={item.value}
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default Tiptap;
