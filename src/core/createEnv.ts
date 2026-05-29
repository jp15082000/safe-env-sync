import { validateEnv } from "./validateEnv.js";

import { EnvSchema } from "../types/env.js";

import { InferEnv } from "../types/infer.js";

export function createEnv<
  TSchema extends EnvSchema
>(
  schema: TSchema
): InferEnv<TSchema> {
  const result = validateEnv(schema);

  if (!result.success) {
    throw new Error(
      "Environment validation failed"
    );
  }

  return result.parsedEnv as InferEnv<TSchema>;
}