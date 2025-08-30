import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ThoughtsSection } from "./sections/thoughts/thoughts-section";
import { WorkspaceSection } from "./sections/workspace/workspace-section";

export const DashboardPage = () => {
  return (
    <ResizablePanelGroup className="h-full" direction="horizontal">
      <ResizablePanel defaultSize={25} maxSize={30} minSize={20}>
        <ThoughtsSection />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <WorkspaceSection />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
