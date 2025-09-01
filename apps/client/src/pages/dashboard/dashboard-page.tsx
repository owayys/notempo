import { Separator, VStack } from "@/components/ui";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./dashboard-header";
import { ConceptsSection } from "./sections/concepts/concepts-section";
import { WorkspaceSection } from "./sections/workspace/workspace-section";

export const DashboardPage = () => {
  return (
    <SidebarProvider>
      <ConceptsSection />
      <VStack className="w-full h-screen">
        <DashboardHeader />
        <Separator />
        <WorkspaceSection />
      </VStack>
    </SidebarProvider>
  );
};
