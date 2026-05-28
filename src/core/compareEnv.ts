import fs from "fs";
import dotenv from "dotenv";
import chalk from "chalk";

function readEnvFile(path: string) {
  const fileContent = fs.readFileSync(path);

  return dotenv.parse(fileContent);
}

export function compareEnvFiles(
  sourcePath: string,
  targetPath: string
) {
  const sourceEnv = readEnvFile(sourcePath);
  const targetEnv = readEnvFile(targetPath);

  const missingKeys: string[] = [];
  const extraKeys: string[] = [];

  // Missing keys
  for (const key in sourceEnv) {
    if (!(key in targetEnv)) {
      missingKeys.push(key);
    }
  }

  // Extra keys
  for (const key in targetEnv) {
    if (!(key in sourceEnv)) {
      extraKeys.push(key);
    }
  }

  console.log("");

  if (missingKeys.length === 0 && extraKeys.length === 0) {
    console.log(
      chalk.green("✅ Environment files are in sync")
    );

    return;
  }

  if (missingKeys.length > 0) {
    console.log(
      chalk.red(`❌ Missing in ${targetPath}:`)
    );

    missingKeys.forEach((key) => {
      console.log(chalk.yellow(`• ${key}`));
    });

    console.log("");
  }

  if (extraKeys.length > 0) {
    console.log(
      chalk.yellow(`⚠️ Extra variables in ${targetPath}:`)
    );

    extraKeys.forEach((key) => {
      console.log(chalk.yellow(`• ${key}`));
    });
  }

  console.log("");
}