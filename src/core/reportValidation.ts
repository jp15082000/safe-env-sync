import chalk from "chalk";

import { ValidationResult } from "../types/result.js";

export function reportValidation(
  result: ValidationResult
) {
  if (result.success) {
    console.log(
      chalk.green("\n✅ Environment validated successfully\n")
    );

    return;
  }

  console.log(
    chalk.red("\n❌ ENV VALIDATION FAILED\n")
  );

  result.issues.forEach((issue) => {
    console.log(
      chalk.yellow(`• ${issue.key}: ${issue.message}`)
    );
  });

  console.log("");
}