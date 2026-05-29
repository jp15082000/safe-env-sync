import fs from "fs";
import dotenv from "dotenv";
import inquirer from "inquirer";

function getDefaultType(value: string) {
  if (value === "true" || value === "false") return "boolean";
  if (!isNaN(Number(value))) return "number";
  return "string";
}

export async function initInteractive(envPath = ".env") {
  const raw = fs.readFileSync(envPath, "utf-8");
  const parsed = dotenv.parse(raw);

  const schemaLines: string[] = [];

  for (const [key, value] of Object.entries(parsed)) {
    const defaultType = getDefaultType(value);

    const answers = await inquirer.prompt([
      {
        type: "select",
        name: "type",
        message: `What is the type of ${key} (${value})?`,
        choices: ["string", "number", "boolean"],
        default: defaultType,
      },
    ]);

    schemaLines.push(
      `  ${key}: { type: "${answers.type}", required: true },`
    );
  }

  return schemaLines.join("\n");
}