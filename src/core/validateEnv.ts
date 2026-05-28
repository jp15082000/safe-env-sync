import dotenv from "dotenv";
import chalk from "chalk";
import { EnvSchema } from "../types/env.js";

dotenv.config();

export function validateEnv(schema: EnvSchema) {
  const parsedEnv: Record<string, any> = {};
  const errors: string[] = [];

  for (const key in schema) {
    const config = schema[key];
    const value = process.env[key];

    // Required check
    if (config.required && !value) {
      errors.push(`Missing required variable: ${key}`);
      continue;
    }

    // Skip undefined optional values
    if (!value) continue;

    // ENUM
    if (config.type === "enum") {
      if (!config.values.includes(value)) {
        errors.push(
          `${key} must be one of: ${config.values.join(", ")}`
        );
      } else {
        parsedEnv[key] = value;
      }

      continue;
    }

    // NUMBER
    if (config.type === "number") {
      const num = Number(value);

      if (isNaN(num)) {
        errors.push(`${key} must be a valid number`);
      } else {
        parsedEnv[key] = num;
      }

      continue;
    }

    // BOOLEAN
    if (config.type === "boolean") {
      if (value !== "true" && value !== "false") {
        errors.push(`${key} must be true or false`);
      } else {
        parsedEnv[key] = value === "true";
      }

      continue;
    }

    // STRING
    parsedEnv[key] = value;
  }

  if (errors.length > 0) {
    console.log(chalk.red("\n❌ ENV VALIDATION FAILED\n"));

    errors.forEach((err) => {
      console.log(chalk.yellow(`• ${err}`));
    });

    process.exit(1);
  }

  console.log(chalk.green("\n✅ Environment validated successfully\n"));

  return parsedEnv;
}