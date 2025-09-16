import type { ConceptType } from "@domain/concept/concept.entity";
import { HStack } from "@/components/ui";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ConceptCrumbs } from "./sections/concepts/concept-crumbs";

interface DashboardHeaderProps {
  concept?: ConceptType;
}

export const DashboardHeader = ({ concept }: DashboardHeaderProps) => {
  return (
    <HStack className="w-full p-2 items-center justify-center">
      <SidebarTrigger className="size-9" variant="link" />
      <HStack className="w-full h-full items-center justify-center text-center">
        <ConceptCrumbs concept={concept} />
      </HStack>
    </HStack>
  );
};
