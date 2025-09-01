import { ThoughtType } from "@domain/thought/thought.schema";
import { HStack, Typography } from "@/components/ui";
import { getRelativeTime } from "@/shared/utils/format-date";

interface ThoughtCardProps {
  thought: ThoughtType;
}

export const ThoughtCard = ({ thought }: ThoughtCardProps) => {
  return (
    <HStack className="w-full relative max-w-full overflow-hidden group transition-all duration-200">
      <Typography
        className="group-hover:text-foreground block pr-5 max-w-full whitespace-normal overflow-hidden max-h-6 group-hover:max-h-32 transition-all duration-200"
        variant="muted"
      >
        {thought.text}
      </Typography>
      <Typography
        className="text-xs text-muted-foreground brightness-75 bg-inherit absolute top-1 right-0 bottom-0"
        variant="muted"
      >
        {getRelativeTime(thought.createdAt)}
      </Typography>
    </HStack>
  );
};
