import type { ConceptType } from "@domain/concept/concept.entity";
import { Separator, VStack } from "@/components/ui";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./dashboard-header";
import { ConceptsSidebar } from "./sections/concepts/concepts-sidebar";
import { WorkspaceContainer } from "./sections/workspace/workspace-container";

interface DashboardPageProps {
  concepts?: ConceptType[];
  selectedConcept?: ConceptType;
}

export const DashboardPage = ({
  concepts,
  selectedConcept,
}: DashboardPageProps) => {
  return (
    <SidebarProvider>
      <ConceptsSidebar concepts={concepts} />
      <VStack className="w-full h-screen">
        <DashboardHeader concept={selectedConcept} />
        <Separator />
        <WorkspaceContainer conceptId={selectedConcept?.id ?? ""} />
      </VStack>
    </SidebarProvider>
  );
};
