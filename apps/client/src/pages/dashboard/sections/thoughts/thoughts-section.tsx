import { HStack, Typography, VStack } from "@/components/ui";

export const ThoughtsSection = () => {
  return (
    <VStack className="h-full items-center justify-start p-6">
      <HStack className="w-full justify-start">
        <Typography variant="muted">Thoughts</Typography>
      </HStack>
    </VStack>
  );
};
