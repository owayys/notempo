"use client";

import type { ThoughtType } from "@domain/thought/thought.entity";
import { useState } from "react";
import { HStack, Typography } from "@/components/ui";
import Tiptap from "@/components/ui/tiptap";
import { getRelativeTime } from "@/shared/utils/format-date";

interface ThoughtCardProps {
  thought: ThoughtType;
}

export const ThoughtCard = ({ thought }: ThoughtCardProps) => {
  const [isEditorActive, setIsEditorActive] = useState(false);

  return (
    <HStack className="w-full relative max-w-full group transition-all duration-300">
      <Tiptap
        className={`text-muted-foreground group-hover:text-foreground block pr-5 w-full max-w-full overflow-hidden break-words group-hover:max-h-screen transition-all duration-300 ${
          isEditorActive
            ? "max-h-screen text-foreground border-l border-accent-foreground p-4 text-lg"
            : "max-h-6"
        }`}
        content={thought.text}
        onBlur={() => setIsEditorActive(false)}
        onFocus={() => setIsEditorActive(true)}
        showCharCount={isEditorActive}
      />
      <Typography
        className="text-xs text-muted-foreground brightness-75 bg-inherit absolute top-1 right-0 bottom-0"
        variant="muted"
      >
        {getRelativeTime(thought.createdAt)}
      </Typography>
    </HStack>
  );
};
