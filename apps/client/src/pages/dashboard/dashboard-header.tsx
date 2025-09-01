import { HStack } from "@/components/ui";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ConceptCrumbs } from "./sections/concepts/concept-crumbs";

export const DashboardHeader = () => {
  return (
    <HStack className="w-full p-2 items-center justify-center">
      <SidebarTrigger className="px-3 py-2 size-9" variant="link" />
      <HStack className="w-full h-full items-center justify-center text-center">
        <ConceptCrumbs />
      </HStack>
    </HStack>
  );
};
