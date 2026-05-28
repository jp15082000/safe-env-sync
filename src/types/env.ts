export type PrimitiveType =
  | "string"
  | "number"
  | "boolean";

export type EnumType = {
  type: "enum";
  values: string[];
  required?: boolean;
  default?: string;
};

export type BasicType = {
  type: PrimitiveType;
  required?: boolean;
  default?: string | number | boolean;
};

export type EnvField = BasicType | EnumType;

export type EnvSchema = Record<string, EnvField>;