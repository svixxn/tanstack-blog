import { registerGlobalMiddleware } from "@tanstack/react-start";
import { loggingMiddleware } from "./lib/logging";

registerGlobalMiddleware({
  middleware: [loggingMiddleware],
});
