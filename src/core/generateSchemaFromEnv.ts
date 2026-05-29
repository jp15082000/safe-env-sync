import fs from "fs";
import dotenv from "dotenv";

function inferType(value: string): "string" | "number" | "boolean" {
  if (value === "true" || value === "false") {
    return "boolean";
  }

  if (!isNaN(Number(value)) && value.trim() !== "") {
    return "number";
  }

  return "string";
}

export function generateSchemaFromEnv(envPath = ".env") {
  if (!fs.existsSync(envPath)) {
    throw new Error(".env file not found");
  }

  const raw = fs.readFileSync(envPath, "utf-8");
  const parsed = dotenv.parse(raw);

  const schemaLines: string[] = [];

  for (const [key, value] of Object.entries(parsed)) {
    const type = inferType(value);

    schemaLines.push(
      `  ${key}: { type: "${type}", required: true },`
    );
  }

  return schemaLines.join("\n");
}