import dotenv from "dotenv";

import { EnvSchema } from "../types/env.js";
import { ValidationResult } from "../types/result.js";
import { parseValue } from "./parseValue.js";

dotenv.config({
  quiet: true,
});

export function validateEnv(
  schema: EnvSchema
): ValidationResult {
  const parsedEnv: Record<string, any> = {};

  const issues: ValidationResult["issues"] = [];

  for (const key in schema) {
    const rules = schema[key];

    const value = process.env[key];

    // REQUIRED
    if (rules.required && !value) {
      issues.push({
        key,
        type: "missing",
        message: "Missing required variable",
      });

      continue;
    }

    // Skip optional empty values
    if (!value) {
      continue;
    }

    // ENUM VALIDATION
    if (rules.type === "enum") {
      if (!rules.values.includes(value)) {
        issues.push({
          key,
          type: "invalid",
          message: `Must be one of: ${rules.values.join(
            ", "
          )}`,
        });

        continue;
      }

      parsedEnv[key] = parseValue(
        value,
        rules.type
      );

      continue;
    }

    // NUMBER VALIDATION
    if (rules.type === "number") {
      const num = Number(value);

      if (isNaN(num)) {
        issues.push({
          key,
          type: "invalid",
          message: "Must be a valid number",
        });

        continue;
      }

      parsedEnv[key] = parseValue(
        value,
        rules.type
      );

      continue;
    }

    // BOOLEAN VALIDATION
    if (rules.type === "boolean") {
      if (
        value !== "true" &&
        value !== "false"
      ) {
        issues.push({
          key,
          type: "invalid",
          message: "Must be true or false",
        });

        continue;
      }

      parsedEnv[key] = parseValue(
        value,
        rules.type
      );

      continue;
    }

    // STRING
    parsedEnv[key] = parseValue(
      value,
      rules.type
    );
  }

  return {
    success: issues.length === 0,
    parsedEnv,
    issues,
  };
}