# safe-env-sync

Environment validation and synchronization toolkit for Node.js applications.

## Features

* Validate environment variables
* Type-safe parsing
* Generate `.env.example`
* Compare environment files
* CLI support
* Enum validation
* Required variable checks

---

## Installation

```bash
npm install safe-env-sync
```

---

## Setup

Create a config file:

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

## Commands

### Validate env variables

```bash
npx safe-env-sync validate
```

---

### Generate `.env.example`

```bash
npx safe-env-sync generate
```

---

### Compare env files

```bash
npx safe-env-sync compare .env .env.production
```

---

## Example

### `.env`

```env
PORT=5000
JWT_SECRET=mysecret
NODE_ENV=development
```

---

## License

MIT
