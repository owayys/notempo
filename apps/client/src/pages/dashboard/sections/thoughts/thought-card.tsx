"use client";

import { ThoughtType } from "@domain/thought/thought.schema";
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
    <HStack className="w-full relative max-w-full overflow-hidden group transition-all duration-200">
      <Tiptap
        className={`text-muted-foreground group-hover:text-foreground block pr-5 max-w-full whitespace-normal overflow-hidden group-hover:max-h-screen transition-all duration-200 ${
          isEditorActive
            ? "max-h-screen text-foreground border-l border-accent-foreground p-4 text-lg"
            : "max-h-6"
        }`}
        content={thought.text}
        onBlur={() => setIsEditorActive(false)}
        onFocus={() => setIsEditorActive(true)}
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
