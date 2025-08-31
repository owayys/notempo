import { HStack, Typography, VStack } from "@/components/ui";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { WorkSpaceEditor } from "@/components/workspace/workspace-editor";

export const WorkspaceSection = () => {
  return (
    <VStack className="h-screen w-full items-center justify-center">
      <HStack className="w-full p-2">
        <SidebarTrigger />
        <HStack className="w-full justify-center text-center">
          <Typography variant="muted">Current Concept</Typography>
        </HStack>
      </HStack>
      <WorkSpaceEditor />
    </VStack>
  );
};
