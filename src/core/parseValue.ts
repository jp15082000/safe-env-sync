export function parseValue(
  value: string,
  type: string
) {
  switch (type) {
    case "number":
      return Number(value);

    case "boolean":
      return value === "true";

    case "string":
    case "enum":
    default:
      return value;
  }
}