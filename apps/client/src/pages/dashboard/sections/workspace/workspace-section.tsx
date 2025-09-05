import { ConceptMeta } from "@/components/concept/concept-meta";
import { Typography, VStack } from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConceptHistory } from "../concepts/concept-history";

export const WorkspaceSection = () => {
  return (
    <ScrollArea className="h-full w-full items-center justify-center overflow-x-hidden">
      <VStack className="h-full w-4/5 max-w-[800px] gap-4 pt-12 m-auto">
        <Typography
          className="font-mono text-accent-foreground w-full py-6"
          variant="h1"
        >
          Agentic Development
        </Typography>
        <ConceptMeta />
        <ConceptHistory />
      </VStack>
    </ScrollArea>
  );
};
