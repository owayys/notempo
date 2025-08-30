import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ConceptsSection } from "./sections/concepts/concepts-section";
import { WorkspaceSection } from "./sections/workspace/workspace-section";

export const DashboardPage = () => {
  return (
    <ResizablePanelGroup className="h-full" direction="horizontal">
      <ResizablePanel defaultSize={25} maxSize={30} minSize={20}>
        <ConceptsSection />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <WorkspaceSection />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
