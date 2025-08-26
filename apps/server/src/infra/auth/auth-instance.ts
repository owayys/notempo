import "reflect-metadata";
import { container } from "tsyringe";
import { resolveAuthFromContainer } from "./better-auth";

export const auth = resolveAuthFromContainer(container);

export default auth;
