import { EnvSchema } from "./env.js";

type InferField<T> =
  T extends { type: "number" }
    ? number
    : T extends { type: "boolean" }
    ? boolean
    : T extends {
        type: "enum";
        values: readonly (infer U)[];
      }
    ? U
    : string;

export type InferEnv<
  TSchema extends EnvSchema
> = {
  [K in keyof TSchema]: InferField<TSchema[K]>;
};