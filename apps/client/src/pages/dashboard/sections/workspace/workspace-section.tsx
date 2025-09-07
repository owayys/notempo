import type { ConceptType } from "@domain/concept/concept.entity";
import type { ThoughtType } from "@domain/thought/thought.entity";
import { ConceptMeta } from "@/components/concept/concept-meta";
import { Typography, VStack } from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThoughtTimeline } from "@/pages/dashboard/sections/thoughts/thought-timeline";

interface WorkspaceSectionProps {
  concept?: ConceptType;
  thoughts?: ThoughtType[];
}

export const WorkspaceSection = ({
  concept,
  thoughts,
}: WorkspaceSectionProps) => {
  return (
    <ScrollArea className="h-full w-full items-center justify-center overflow-x-hidden">
      <VStack className="h-full w-4/5 max-w-[800px] gap-4 pt-12 m-auto">
        <Typography
          className="font-mono text-accent-foreground w-full py-6"
          variant="h1"
        >
          {concept?.label}
        </Typography>
        <ConceptMeta concept={concept} />
        <ThoughtTimeline thoughts={thoughts} />
      </VStack>
    </ScrollArea>
  );
};
