"use client";

import { DashboardPage } from "@/pages/dashboard/dashboard-page";
import { useConcepts } from "@/shared/hooks/concept-hooks";

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
