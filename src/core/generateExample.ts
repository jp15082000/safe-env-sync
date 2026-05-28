import fs from "fs";
import { EnvSchema } from "../types/env.js";

export function generateExample(schema: EnvSchema) {
  let content = "";

  for (const key in schema) {
    content += `${key}=\n`;
  }

  fs.writeFileSync(".env.example", content);

  console.log("✅ .env.example generated");
}