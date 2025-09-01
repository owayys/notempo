import { HStack, Typography } from "@/components/ui";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const DashboardHeader = () => {
  return (
    <HStack className="w-full p-2 items-center justify-center">
      <SidebarTrigger className="px-3 py-2 size-9" variant="link" />
      <HStack className="w-full h-full items-center justify-center text-center">
        <Typography variant="muted">Current Concept</Typography>
      </HStack>
    </HStack>
  );
};
