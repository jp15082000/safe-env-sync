import fs from "fs";
import dotenv from "dotenv";

import { EnvSchema } from "../types/env.js";

export function detectUnusedVars(
  schema: EnvSchema
): string[] {
  // Read raw .env file
  const envFile = fs.readFileSync(".env", "utf-8");

  // Parse only .env variables
  const parsed = dotenv.parse(envFile);

  const envKeys = Object.keys(parsed);

  const schemaKeys = Object.keys(schema);

  const unused = envKeys.filter((key) => {
    return !schemaKeys.includes(key);
  });

  return unused;
}