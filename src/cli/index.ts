#!/usr/bin/env node

import { Command } from "commander";
import { generateExample } from "../core/generateExample.js";
import { compareEnvFiles } from "../core/compareEnv.js";
import { validateEnv } from "../core/validateEnv.js";
import { loadConfig } from "../core/loadConfig.js";
import { reportValidation } from "../core/reportValidation.js";
import { detectUnusedVars } from "../core/detectUnusedVars.js";
import { reportUnusedVars } from "../core/reportUnusedVars.js";
import { detectExampleDrift } from "../core/detectExampleDrift.js";
import { reportExampleDrift } from "../core/reportExampleDrift.js";
import { generateSchemaFromEnv } from "../core/generateSchemaFromEnv.js";
import { writeConfigFile } from "../core/writeConfigFile.js";

const program = new Command();

program
  .name("safe-env-sync")
  .description("Environment management toolkit")
  .version("1.0.0");

// program
//   .command("init")
//   .description("Generate config from existing .env")
//   .action(() => {
//     const schema = generateSchemaFromEnv();

//     writeConfigFile(schema);
//   });

program
  .command("generate")
  .description("Generate .env.example")
  .action(async () => {
    const config = await loadConfig();

    generateExample(config);
  });

program
  .command("init")
  .option("--interactive")
  .description("Generate config from .env")
  .action(async (options) => {
    const { initInteractive } = await import("../core/initInteractive.js");
    const { writeConfigFile } = await import("../core/writeConfigFile.js");

    let schema;

    if (options.interactive) {
      schema = await initInteractive();
    } else {
      // fallback to auto generator
    }

    writeConfigFile(schema as string);
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

    const result = validateEnv(config);

    reportValidation(result);

    if (!result.success) {
      process.exit(1);
    }
  });

program
  .command("doctor")
  .description("Run environment health diagnostics")
  .action(async () => {
    const config = await loadConfig();

    // Validate env
    const validation = validateEnv(config);

    reportValidation(validation);

    // Detect unused vars
    const unused = detectUnusedVars(config);

    reportUnusedVars(unused);

    // Detect .env.example drift
    const drift = detectExampleDrift();

    reportExampleDrift(drift);

    // Exit with failure if validation failed
    if (!validation.success) {
      process.exit(1);
    }
  });

program.parse();
