"use client";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import {
  EditorContent,
  type EditorOptions,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box } from "@/components/ui/layout";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { SmartBraces } from "@/shared/tiptap-extensions";

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
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount.configure({
        limit: CHARACTER_LIMIT,
        mode: "textSize",
      }),
      SmartBraces,
    ],
    content,
    // Don't render immediately on the server to avoid SSR issues
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
        onBlur={onBlur}
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
    </Box>
  );
};

export default Tiptap;
