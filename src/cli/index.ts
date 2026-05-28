#!/usr/bin/env node

import { Command } from "commander";
import { generateExample } from "../core/generateExample.js";
import { compareEnvFiles } from "../core/compareEnv.js";
import { validateEnv } from "../core/validateEnv.js";
import { loadConfig } from "../core/loadConfig.js";

const program = new Command();

program
  .name("safe-env-sync")
  .description("Environment management toolkit")
  .version("1.0.0");

program
  .command("generate")
  .description("Generate .env.example")
  .action(async () => {
    const config = await loadConfig();

    generateExample(config);
  });

program
  .command("compare")
  .description("Compare two env files")
  .argument("<source>", "Source env file")
  .argument("<target>", "Target env file")
  .action((source, target) => {
    compareEnvFiles(source, target);
  });

program
  .command("validate")
  .description("Validate environment variables")
  .action(async () => {
    const config = await loadConfig();

    validateEnv(config);
  });

program.parse();