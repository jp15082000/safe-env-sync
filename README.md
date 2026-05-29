# safe-env-sync

Type-safe environment validation, diagnostics, and schema management for Node.js + TypeScript applications.

`safe-env-sync` upgrades traditional `.env` handling into a structured, validated, and developer-friendly configuration system.

Instead of treating environment variables as untyped strings, it treats them like configuration contracts.

---

# ✨ Features

## 🔍 Environment Validation

Validate required environment variables with schema-based rules.

Supports:

* string
* number
* boolean
* enum

---

## 🧠 Type-Safe Parsing

Automatically converts environment variables into proper runtime types.

```ts
env.PORT // number
env.DEBUG // boolean
```

instead of raw strings.

---

## ⚡ Doctor Command (Flagship Feature)

Run full environment diagnostics.

Detects:

* missing variables
* unused variables
* schema mismatches
* `.env.example` drift

```bash
npx safe-env-sync doctor
```

Example output:

```bash
✖ Missing Variables
  DATABASE_URL

⚠ Unused Variables
  OLD_API_KEY

⚠ Drift Detected
  .env.example missing:
    REDIS_URL

✔ Validation complete
```

---

## 🧩 Schema Definition

Define environment contracts centrally using `defineEnv()`.

```ts
import { defineEnv } from "safe-env-sync";

export default defineEnv({
  PORT: {
    type: "number",
    required: true,
  },

  JWT_SECRET: {
    type: "string",
    required: true,
  },

  NODE_ENV: {
    type: "enum",
    values: ["development", "production"],
    required: true,
  },
});
```

---

## 🛠 Interactive Initialization

Generate schemas interactively from existing `.env` files.

```bash
npx safe-env-sync init --interactive
```

---

## 📄 Generate `.env.example`

Automatically generate `.env.example` from schema definitions.

```bash
npx safe-env-sync generate
```

---

## 🔄 Compare Environment Files

Compare two environment files.

Useful for:

* staging vs production
* local vs production
* CI verification

```bash
npx safe-env-sync compare .env .env.production
```

---

## 🧹 Unused Variable Detection

Detect variables present in `.env` but missing from schema definitions.

---

## 🌊 Drift Detection

Ensure `.env.example` stays synchronized with the actual schema.

---

# 📦 Installation

```bash
npm install safe-env-sync
```

---

# 🚀 Quick Start

## 1. Create a schema

### `safe-env.config.ts`

```ts
import { defineEnv } from "safe-env-sync";

export default defineEnv({
  PORT: {
    type: "number",
    required: true,
  },

  JWT_SECRET: {
    type: "string",
    required: true,
  },

  NODE_ENV: {
    type: "enum",
    values: ["development", "production"],
    required: true,
  },
});
```

---

## 2. Create your `.env`

```env
PORT=5000
JWT_SECRET=mysecret
NODE_ENV=development
```

---

## 3. Validate your environment

```bash
npx safe-env-sync validate
```

---

# 📚 CLI Commands

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `validate`           | Validate environment variables   |
| `doctor`             | Run full environment diagnostics |
| `generate`           | Generate `.env.example`          |
| `compare`            | Compare two env files            |
| `init`               | Generate schema from `.env`      |
| `init --interactive` | Interactive schema builder       |

---

# 🧠 Why safe-env-sync?

Traditional `.env` handling often leads to:

* runtime crashes
* missing secrets
* invalid types
* stale `.env.example` files
* onboarding confusion

`safe-env-sync` solves this with:

* schema enforcement
* runtime validation
* type-safe parsing
* environment diagnostics
* drift detection

---

# 🏗 Philosophy

> Environment variables are configuration code, not hidden strings.

---

# 🛣 Roadmap

Upcoming features:

* `doctor --fix`
* GitHub Action integration
* watch mode
* stronger enum inference
* schema patching
* monorepo support

---

# 📄 License

MIT
