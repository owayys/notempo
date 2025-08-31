"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";

interface EditorProps {
  content: string;
  className?: string;
}

const Tiptap = ({ content, className }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none h-full min-h-full",
      },
    },
  });

  return (
    <EditorContent
      className={cn(
        "h-full [&_.ProseMirror]:h-full [&_.ProseMirror]:min-h-full",
        className,
      )}
      editor={editor}
    />
  );
};

export default Tiptap;
