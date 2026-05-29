import { defineEnv, createEnv } from "./index.js";

const config = defineEnv({
  PORT: {
    type: "number",
    required: true,
  },

  DEBUG: {
    type: "boolean",
    required: true,
  },

  NODE_ENV: {
    type: "enum",
    values: ["development", "production"],
    required: true,
  },
});

const env = createEnv(config);

console.log(typeof env.PORT);
console.log(typeof env.DEBUG);

console.log(env);



