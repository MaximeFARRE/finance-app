import { describe, it, expect } from "vitest";
import { getLevelInfo } from "./level-engine";

describe("getLevelInfo", () => {
  it("returns level 1 for 0 XP", () => {
    const info = getLevelInfo(0);
    expect(info.level).toBe(1);
    expect(info.title).toBe("Stagiaire");
  });

  it("returns level 2 for 50 XP", () => {
    const info = getLevelInfo(50);
    expect(info.level).toBe(2);
    expect(info.title).toBe("Analyste Junior");
  });

  it("returns level 5 at 700 XP", () => {
    const info = getLevelInfo(700);
    expect(info.level).toBe(5);
    expect(info.title).toBe("Associate");
  });

  it("returns highest level at max XP", () => {
    const info = getLevelInfo(10000);
    expect(info.level).toBe(9);
    expect(info.title).toBe("Partner");
  });

  it("returns 0% progress at level threshold", () => {
    expect(getLevelInfo(0).progressPercent).toBe(0);
    expect(getLevelInfo(50).progressPercent).toBe(0);
  });

  it("returns correct progress within level", () => {
    const info = getLevelInfo(100);
    expect(info.progressPercent).toBe(50);
  });

  it("returns 100% at max level", () => {
    expect(getLevelInfo(6000).progressPercent).toBe(100);
  });
});
