import { HStack, Typography, VStack } from "@/components/ui";

export const ConceptsSection = () => {
  return (
    <VStack className="h-full items-center justify-start p-6">
      <HStack className="w-full justify-start">
        <Typography variant="muted">Concepts</Typography>
      </HStack>
    </VStack>
  );
};
