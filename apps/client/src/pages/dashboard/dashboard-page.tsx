import { Box } from "@/components/ui";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ConceptsSection } from "./sections/concepts/concepts-section";
import { WorkspaceSection } from "./sections/workspace/workspace-section";

export const DashboardPage = () => {
  return (
    <SidebarProvider>
      <ConceptsSection />
      <WorkspaceSection />
    </SidebarProvider>
  );
};
