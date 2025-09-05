"use client";
import { Placeholder } from "@tiptap/extensions";
import { EditorContent, EditorOptions, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";
import { SmartBraces } from "@/shared/utils/tiptap-extensions";

interface EditorProps {
  content?: EditorOptions["content"];
  className?: string;
  autofocus?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Tiptap = ({
  content,
  className,
  placeholder = "Write something...",
  autofocus = false,
  onFocus,
  onBlur,
}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
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

  return (
    <EditorContent
      className={cn(
        "h-full [&_.ProseMirror]:h-full [&_.ProseMirror]:min-h-full",
        className,
      )}
      editor={editor}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

export default Tiptap;
