import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/shared/orpc";

const thoughtsQueryOptions = (text?: string) => {
  return orpc.authenticated.thought.getThought.queryOptions({
    retry: 2,
    input: {
      text,
    },
    select: (data) => data.items,
  });
};

const createThoughtQueryOptions = (text: string, concepts: string[]) => {
  return orpc.authenticated.thought.createThought.queryOptions({
    input: {
      text,
      concepts,
    },
  });
};

export const useThoughts = (text?: string) =>
  useQuery(thoughtsQueryOptions(text));

export const useCreateThought = (text: string, concepts: string[]) =>
  useQuery(createThoughtQueryOptions(text, concepts));
