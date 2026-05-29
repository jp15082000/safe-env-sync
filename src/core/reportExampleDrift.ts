import chalk from "chalk";

export function reportExampleDrift(
  missing: string[]
) {
  if (missing.length === 0) {
    console.log(
      chalk.green(
        "✔ .env.example is in sync"
      )
    );

    return;
  }

  console.log(
    chalk.yellow(
      "\n⚠ .env.example is missing variables:\n"
    )
  );

  missing.forEach((key) => {
    console.log(chalk.yellow(`• ${key}`));
  });

  console.log("");
}