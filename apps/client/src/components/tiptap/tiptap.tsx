"use client";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import {
  EditorContent,
  type EditorOptions,
  type Range,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { type KeyboardEvent, useState } from "react";
import {
  MentionConcept,
  SmartBraces,
} from "@/components/tiptap/tiptap-extensions";
import { Box } from "@/components/ui/layout";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  createConceptMutation,
  useConcepts,
} from "@/shared/hooks/concept-hooks";
import { type Item, MentionInput } from "./mention-input";

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

const Tiptap = ({
  content,
  className,
  placeholder = "Write something...",
  autofocus = false,
  onFocus,
  onBlur,
  showCharCount = false,
}: EditorProps) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [conceptsQuery, setConceptsQuery] = useState<string>("");

  const { data: concepts = [], isLoading } = useConcepts(conceptsQuery, 5);

  const [currentRange, setCurrentRange] = useState<Range | number>(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      CharacterCount.configure({
        limit: CHARACTER_LIMIT,
        mode: "textSize",
      }),
      SmartBraces,
      MentionConcept.configure({
        suggestion: {
          char: "#",
          items: () => {
            if (isLoading) {
              return [{ id: "loading", label: "Loading...", value: "loading" }];
            }

            return concepts.map((c) => ({
              id: c.id,
              label: c.label,
              value: c.label,
            }));
          },
          render: () => {
            return {
              onStart: (props) => {
                setCurrentRange(props.range);

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
                setCurrentRange(props.range);

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
                setCurrentRange(0);
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

  const createConceptMut = createConceptMutation();

  const handleSelectConcept = (concept: Item) => {
    editor?.commands.insertContentAt(currentRange, [
      {
        type: "mention",
        attrs: { id: concept.id, label: concept.label },
      },
      { type: "text", text: " " },
    ]);
    editor?.commands.focus("end");
    setOpen(false);
  };

  const handleCreateConcept = async (label: string) => {
    const res = await createConceptMut.mutateAsync({ label });
    handleSelectConcept(res);
  };

  const onInput = (event: KeyboardEvent) => {
    if (event.key === "Backspace") {
      const input = event.currentTarget as HTMLInputElement;
      if (!input.value) {
        editor?.commands.focus("end");
        setOpen(false);
      }
    }
  };

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

      <MentionInput
        createItem={handleCreateConcept}
        creationPending={createConceptMut.isPending}
        inputHook={onInput}
        items={concepts}
        open={open}
        position={position}
        query={conceptsQuery}
        queryLoading={isLoading}
        selectItem={handleSelectConcept}
        setOpen={setOpen}
        setQuery={setConceptsQuery}
      />
    </Box>
  );
};

export default Tiptap;
