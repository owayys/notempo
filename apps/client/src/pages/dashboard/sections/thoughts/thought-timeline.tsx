import { ThoughtType } from "@domain/thought/thought.schema";
import { ChevronsUpDown } from "lucide-react";
import { Box, HStack, Separator, Typography, VStack } from "@/components/ui";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getMonthPretty } from "@/shared/utils/format-date";
import { ThoughtCard } from "./thought-card";

interface ThoughtTimelineProps {
  thoughts: ThoughtType[];
}

const groupThoughtsByMonth = (
  thoughts: ThoughtType[],
): Record<string, ThoughtType[]> => {
  return thoughts
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .reduce((groups, thought) => {
      const monthKey = getMonthPretty(thought.createdAt);

      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }

      groups[monthKey].push(thought);

      return groups;
    }, {} as Record<string, ThoughtType[]>);
};

const RenderThoughts = ({ thoughts }: ThoughtTimelineProps) => {
  return (
    <>
      {thoughts.map((t, i) => (
        <Box className="w-full" key={t.id}>
          <ThoughtCard key={t.id} thought={t} />
          {i !== thoughts.length - 1 && (
            <Separator className="my-2" variant="dashed" />
          )}
        </Box>
      ))}
    </>
  );
};

export const ThoughtTimeline = ({ thoughts }: ThoughtTimelineProps) => {
  const groupedThoughts = groupThoughtsByMonth(thoughts);
  const months = Object.keys(groupedThoughts);

  return (
    <VStack className="w-full">
      <RenderThoughts thoughts={groupedThoughts[months[0]]} />
      {months.slice(1).map((m) => (
        <Collapsible className="w-full" key={m}>
          <CollapsibleTrigger asChild>
            <HStack className="w-full items-center my-4 text-primary group hover:text-accent-foreground cursor-pointer transition-all duration-200">
              <Typography>{m}</Typography>
              <Separator className="flex flex-1 ml-2 mr-1.5 bg-primary group-hover:bg-accent-foreground transition-all duration-200" />
              <ChevronsUpDown className="size-4 translate-x-0.5" />
            </HStack>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <RenderThoughts thoughts={groupedThoughts[m]} />
          </CollapsibleContent>
        </Collapsible>
      ))}
    </VStack>
  );
};
