import {
  CreateThoughtParams,
  CreateThoughtResponse,
  GetThoughtDetailsParams,
  GetThoughtDetailsResponse,
  GetThoughtParams,
  GetThoughtResponse,
} from "@domain/thought/thought.schema";
import { appAuthenticatedBase } from "@contract/utils/oc.base";

const thoughtBase = appAuthenticatedBase;

export const createThought = thoughtBase
  .route({
    method: "POST",
    path: "/thought",
    summary: "Create a new thought",
    tags: ["thought"],
  })
  .input(CreateThoughtParams)
  .output(CreateThoughtResponse);

export const getThought = thoughtBase
  .route({
    method: "GET",
    path: "/thought",
    summary: "Get thoughts",
    tags: ["thought"],
  })
  .input(GetThoughtParams)
  .output(GetThoughtResponse);

export const getThoughtDetails = thoughtBase
  .route({
    method: "GET",
    path: "/thought/:id",
    summary: "Get thought details",
    tags: ["thought"],
  })
  .input(GetThoughtDetailsParams)
  .output(GetThoughtDetailsResponse);

export default { createThought, getThought, getThoughtDetails };
