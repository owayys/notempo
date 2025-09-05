import Tiptap from "@/components/ui/tiptap";

export const ThoughtEditor = () => {
  return (
    <Tiptap
      autofocus
      className="min-h-40 text-lg w-full h-full overflow-hidden"
      placeholder="Thinking..."
      showCharCount
    />
  );
};
