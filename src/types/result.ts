export interface ValidationIssue {
  key: string;
  message: string;
  type: "missing" | "invalid";
}

export interface ValidationResult {
  success: boolean;
  parsedEnv: Record<string, any>;
  issues: ValidationIssue[];
}