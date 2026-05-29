import chalk from "chalk";

export function reportUnusedVars(
  unused: string[]
) {
  if (unused.length === 0) {
    console.log(
      chalk.green("✔ No unused variables found")
    );

    return;
  }

  console.log(
    chalk.yellow(
      "\n⚠ Unused environment variables detected:\n"
    )
  );

  unused.forEach((key) => {
    console.log(chalk.yellow(`• ${key}`));
  });

  console.log("");
}