import { Box, HStack, VStack } from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConceptHistory } from "../concepts/concept-history";

export const WorkspaceSection = () => {
  return (
    <ScrollArea className="h-full w-full items-center justify-center overflow-x-hidden">
      <VStack className="h-full w-4/5 max-w-[900px] gap-4 pt-12 m-auto">
        <HStack className="w-full p-6 border border-accent-foreground">
          TITLE
        </HStack>
        <Box className="w-full p-6 py-12 border border-accent-foreground">
          META
        </Box>
        <ConceptHistory />
      </VStack>
    </ScrollArea>
  );
};
