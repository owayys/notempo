import { useMutation, useQuery } from "@tanstack/react-query";
import { orpc } from "@/shared/orpc";
import { queryClient } from "../query-client";

const conceptsQueryOptions = (search?: string, limit?: number) => {
  return orpc.authenticated.concept.getConcept.queryOptions({
    retry: 2,
    input: {
      label: search,
      limit,
      sortBy: "updatedAt",
      sortOrder: "desc",
    },
    select: (data) => data.items,
    staleTime: 60 * 1000 * 1,
    queryKey: [
      "concepts",
      {
        label: search,
        limit,
      },
    ],
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

const createConceptMutationOptions =
  orpc.authenticated.concept.createConcept.mutationOptions({
    retry: 2,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["concepts"] }),
  });

export const useConcepts = (search?: string, limit?: number) =>
  useQuery(conceptsQueryOptions(search, limit));

export const useConceptDetails = (id: string) =>
  useQuery(conceptDetailsQueryOptions(id));

export const createConceptMutation = () => {
  return useMutation(createConceptMutationOptions);
};
