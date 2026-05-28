import { describe, it, expect } from "vitest";
import { parseNumericInput, isWithinTolerance } from "./answer-utils";

// ---------------------------------------------------------------------------
// parseNumericInput
// ---------------------------------------------------------------------------

describe("parseNumericInput", () => {
  // --- Cas nominaux ---
  it("parses a plain integer", () => {
    expect(parseNumericInput("375")).toBe(375);
  });

  it("parses a plain decimal with dot", () => {
    expect(parseNumericInput("1.5")).toBe(1.5);
  });

  it("parses a decimal with comma (French locale)", () => {
    expect(parseNumericInput("1,5")).toBe(1.5);
  });

  it("strips internal spaces (thousands separator)", () => {
    expect(parseNumericInput("375 000")).toBe(375000);
  });

  it("strips leading and trailing whitespace", () => {
    expect(parseNumericInput("  42  ")).toBe(42);
  });

  it("parses a negative number with hyphen-minus", () => {
    expect(parseNumericInput("-100")).toBe(-100);
  });

  it("parses a negative number with typographic minus (−)", () => {
    expect(parseNumericInput("−100")).toBe(-100);
  });

  it("parses zero", () => {
    expect(parseNumericInput("0")).toBe(0);
  });

  it("parses a negative decimal", () => {
    expect(parseNumericInput("-1,5")).toBe(-1.5);
  });

  it("combines spaces and comma", () => {
    expect(parseNumericInput("1 250,75")).toBe(1250.75);
  });

  // --- Cas invalides ---
  it("returns null for an empty string", () => {
    expect(parseNumericInput("")).toBeNull();
  });

  it("returns null for whitespace only", () => {
    expect(parseNumericInput("   ")).toBeNull();
  });

  it("returns null for a lone minus sign", () => {
    expect(parseNumericInput("-")).toBeNull();
  });

  it("returns null for a non-numeric string", () => {
    expect(parseNumericInput("abc")).toBeNull();
  });

  it("returns null for Infinity", () => {
    expect(parseNumericInput("Infinity")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// isWithinTolerance
// ---------------------------------------------------------------------------

describe("isWithinTolerance", () => {
  // --- Correspondance exacte ---
  it("accepts an exact match", () => {
    expect(isWithinTolerance(250, 250, 0.05)).toBe(true);
  });

  // --- Tolérance relative ---
  it("accepts a value within tolerance (just inside)", () => {
    // 5% of 250 = 12.5 → 262 is 4.8% off
    expect(isWithinTolerance(262, 250, 0.05)).toBe(true);
  });

  it("accepts a value at the exact tolerance boundary", () => {
    // 5% of 250 = 12.5 → 262.5 is exactly 5% off
    expect(isWithinTolerance(262.5, 250, 0.05)).toBe(true);
  });

  it("rejects a value outside tolerance", () => {
    // 300 is 20% off from 250
    expect(isWithinTolerance(300, 250, 0.05)).toBe(false);
  });

  it("accepts a lower value within tolerance", () => {
    // 238 is 4.8% below 250
    expect(isWithinTolerance(238, 250, 0.05)).toBe(true);
  });

  it("rejects a lower value outside tolerance", () => {
    // 200 is 20% below 250
    expect(isWithinTolerance(200, 250, 0.05)).toBe(false);
  });

  // --- Valeurs négatives ---
  it("accepts an exact negative match", () => {
    expect(isWithinTolerance(-100, -100, 0.05)).toBe(true);
  });

  it("accepts a negative value within tolerance", () => {
    // -95 is 5% off from -100
    expect(isWithinTolerance(-95, -100, 0.05)).toBe(true);
  });

  it("rejects a negative value outside tolerance", () => {
    // -80 is 20% off from -100
    expect(isWithinTolerance(-80, -100, 0.05)).toBe(false);
  });

  // --- Cas spécial : expected === 0 (tolérance absolue ±0.01) ---
  it("accepts zero input when expected is zero", () => {
    expect(isWithinTolerance(0, 0, 0.05)).toBe(true);
  });

  it("accepts a tiny value within absolute threshold when expected is zero", () => {
    expect(isWithinTolerance(0.005, 0, 0.05)).toBe(true);
  });

  it("rejects a value beyond absolute threshold when expected is zero", () => {
    expect(isWithinTolerance(0.02, 0, 0.05)).toBe(false);
  });

  // --- Tolérance stricte (0) ---
  it("accepts exact match with zero tolerance", () => {
    expect(isWithinTolerance(10, 10, 0)).toBe(true);
  });

  it("rejects any deviation with zero tolerance", () => {
    expect(isWithinTolerance(10.0001, 10, 0)).toBe(false);
  });
});
