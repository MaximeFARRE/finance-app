import type { Track } from "@/lib/types";

import { lessonStructureDuCapital } from "./l1-structure-du-capital";
import { lessonValorisationDcf } from "./l2-valorisation-dcf";
import { lessonComparables } from "./l3-comparables";
import { lessonFusionsAcquisitions } from "./l4-fusions-acquisitions";
import { lessonLbo } from "./l5-lbo";

export const corporateFinanceTrack: Track = {
  id: "corporate-finance",
  title: "Corporate Finance",
  description: "Structure du capital, valorisation DCF, M&A et LBO — les fondamentaux pour les entretiens IBD.",
  emoji: "🏦",
  color: "purple",
  lessons: [
    lessonStructureDuCapital,
    lessonValorisationDcf,
    lessonComparables,
    lessonFusionsAcquisitions,
    lessonLbo,
  ],
};
