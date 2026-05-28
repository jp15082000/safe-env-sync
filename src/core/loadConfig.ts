import fs from "fs";
import path from "path";
import chalk from "chalk";
import { pathToFileURL } from "url";

export async function loadConfig() {
  const cwd = process.cwd();

  const possibleFiles = [
    "safe-env.config.ts",
    "safe-env.config.js",
  ];

  let configPath: string | null = null;

  for (const file of possibleFiles) {
    const fullPath = path.join(cwd, file);

    if (fs.existsSync(fullPath)) {
      configPath = fullPath;
      break;
    }
  }

  if (!configPath) {
    console.log(
      chalk.red(
        "\n❌ safe-env.config.ts or safe-env.config.js not found\n"
      )
    );

    process.exit(1);
  }

  const fileUrl = pathToFileURL(configPath).href;

  const importedConfig = await import(fileUrl);

  return importedConfig.default;
}