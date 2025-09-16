"use client";

import { useConceptDetails } from "@/shared/hooks/concept-hooks";
import { WorkspaceSection } from "./workspace-section";

export const WorkspaceContainer = ({ conceptId }: { conceptId: string }) => {
  const { data } = useConceptDetails(conceptId);

  return <WorkspaceSection concept={data?.concept} thoughts={data?.thoughts} />;
};
