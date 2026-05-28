/**
 * Parses a user-typed numeric string into a number.
 * Handles: spaces ("375 000"), comma decimals ("1,5"), typographic minus ("−100").
 * Returns null if the string is empty or cannot be parsed as a finite number.
 */
export function parseNumericInput(raw: string): number | null {
  const normalized = raw
    .trim()
    .replace(/\s/g, "")      // "375 000" → "375000"
    .replace(",", ".")        // "1,5"     → "1.5"
    .replace("−", "-");       // typographic minus → hyphen-minus
  if (normalized === "" || normalized === "-") return null;
  const value = parseFloat(normalized);
  return isFinite(value) ? value : null;
}

/**
 * Returns true if `input` is within `tolerance` (fraction) of `expected`.
 * Special case: when expected === 0, uses an absolute threshold of ±0.01.
 */
export function isWithinTolerance(
  input: number,
  expected: number,
  tolerance: number
): boolean {
  if (expected === 0) return Math.abs(input) <= 0.01;
  return Math.abs(input - expected) / Math.abs(expected) <= tolerance;
}
