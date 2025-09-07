import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/shared/orpc";

const conceptsQueryOptions = (search?: string) => {
  return orpc.authenticated.concept.getConcept.queryOptions({
    retry: 2,
    input: {
      label: search,
    },
    select: (data) => data.items,
  });
};

const conceptDetailsQueryOptions = (id: string) => {
  return orpc.authenticated.concept.getConceptDetails.queryOptions({
    retry: 2,
    input: {
      id,
    },
    enabled: id !== "",
  });
};

export const useConcepts = (search?: string) =>
  useQuery(conceptsQueryOptions(search));

export const useConceptDetails = (id: string) =>
  useQuery(conceptDetailsQueryOptions(id));
