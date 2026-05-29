import fs from "fs";

export function writeConfigFile(content: string) {
  const file = `safe-env.config.ts`;

  const full = `
import { defineEnv } from "safe-env-sync";

export default defineEnv({
${content}
});
`;

  fs.writeFileSync(file, full.trim());

  console.log("✅ safe-env.config.ts created");
}