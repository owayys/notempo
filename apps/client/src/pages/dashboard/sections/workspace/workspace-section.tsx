import { Box, HStack, VStack } from "@/components/ui";
import { ConceptHistory } from "../concepts/concept-history";

export const WorkspaceSection = () => {
  return (
    <VStack className="h-full w-full items-center justify-center overflow-y-scroll">
      <VStack className="h-full w-4/5 max-w-[800px] gap-4 pt-12 m-auto">
        <HStack className="w-full p-6 border border-accent-foreground">
          TITLE
        </HStack>
        <Box className="w-full p-6 py-12 border border-accent-foreground">
          META
        </Box>
        <ConceptHistory />
      </VStack>
    </VStack>
  );
};
