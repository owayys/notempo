import {
  CreateConceptParams,
  CreateConceptResponse,
  GetConceptDetailsParams,
  GetConceptDetailsResponse,
  GetConceptParams,
  GetConceptResponse,
} from "@domain/concept/concept.schema";
import { appPublicBase } from "@contract/utils/oc.base";

const conceptBase = appPublicBase;

export const createConcept = conceptBase
  .route({
    method: "POST",
    path: "/concept",
    summary: "Create a new concept",
    tags: ["concept"],
  })
  .input(CreateConceptParams)
  .output(CreateConceptResponse);

export const getConcept = conceptBase
  .route({
    method: "GET",
    path: "/concept",
    summary: "Get concepts",
    tags: ["concept"],
  })
  .input(GetConceptParams)
  .output(GetConceptResponse);

export const getConceptDetails = conceptBase
  .route({
    method: "GET",
    path: "/concept/:id",
    summary: "Get concept details",
    tags: ["concept"],
  })
  .input(GetConceptDetailsParams)
  .output(GetConceptDetailsResponse);

export default { createConcept, getConcept, getConceptDetails };
