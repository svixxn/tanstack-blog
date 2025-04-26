import { createMiddleware } from "@tanstack/react-start";

export const loggingMiddleware = createMiddleware().server(
  async ({ next, data }) => {
    const result = await next();
    return result;
  },
);
