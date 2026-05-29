import fs from "fs";
import dotenv from "dotenv";

export function detectExampleDrift(): string[] {
  // Ensure files exist
  if (
    !fs.existsSync(".env") ||
    !fs.existsSync(".env.example")
  ) {
    return [];
  }

  // Parse files
  const env = dotenv.parse(
    fs.readFileSync(".env")
  );

  const example = dotenv.parse(
    fs.readFileSync(".env.example")
  );

  const envKeys = Object.keys(env);

  const exampleKeys = Object.keys(example);

  // Find keys missing from example
  const missing = envKeys.filter(
    (key) => !exampleKeys.includes(key)
  );

  return missing;
}