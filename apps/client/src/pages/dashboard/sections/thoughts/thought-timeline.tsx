import { ThoughtType } from "@domain/thought/thought.schema";
import { Box, Separator, VStack } from "@/components/ui";
import { ThoughtCard } from "./thought-card";

interface ThoughtTimelineProps {
  thoughts: ThoughtType[];
}

export const ThoughtTimeline = ({ thoughts }: ThoughtTimelineProps) => {
  return (
    <VStack className="w-full">
      {thoughts.map((t) => (
        <Box className="w-full" key={t.id}>
          <ThoughtCard key={t.id} thought={t} />
          <Separator className="my-2" variant="dashed" />
        </Box>
      ))}
    </VStack>
  );
};
