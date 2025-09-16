"use client";

import { useConcepts } from "@/shared/hooks/concept-hooks";
import { DashboardPage } from "@/views/dashboard/dashboard-page";

interface DashboardContainerProps {
  selectedConceptId?: string;
}

export const DashboardContainer = ({
  selectedConceptId,
}: DashboardContainerProps) => {
  const { data: concepts } = useConcepts();

  const selectedConcept = concepts?.find((c) => c.id === selectedConceptId);

  return (
    <DashboardPage concepts={concepts} selectedConcept={selectedConcept} />
  );
};
