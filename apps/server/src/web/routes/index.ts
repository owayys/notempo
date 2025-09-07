import { authenticated } from "../utils/orpc.utils";
import conceptRouter from "./concept.routes";
import thoughtRouter from "./thought.routes";

export const router = {
  authenticated: authenticated.router({
    concept: conceptRouter,
    thought: thoughtRouter,
  }),
};
