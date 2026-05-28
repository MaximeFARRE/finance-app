import type { Track } from "@/lib/types";

import { lessonAction } from "./l1-action";
import { lessonObligation } from "./l1-obligation";
import { lessonRendement } from "./l1-rendement";
import { lessonRisque } from "./l1-risque";
import { lessonMarchePrimaire } from "./l1-marche-primaire";
import { lessonMarcheSecondaire } from "./l1-marche-secondaire";
import { lessonMarketCap } from "./l1-market-cap";
import { lessonDividende } from "./l1-dividende";
import { lessonVolume } from "./l1-volume";
import { lessonLiquidite } from "./l1-liquidite";
import { lessonBuysideSellside } from "./l1-buyside-sellside";
import { lessonActeurs } from "./l1-acteurs";
import { lessonBossWorld1 } from "./boss-world-1";

export const marketFinanceTrack: Track = {
  id: "market-finance",
  title: "Finance de marché",
  description: "Les fondamentaux des marchés financiers, de A à Z.",
  emoji: "📈",
  color: "blue",
  worlds: [
    {
      id: "mf-world-1-market-basics",
      trackId: "market-finance",
      title: "Bases des marchés financiers",
      description: "Comprendre les instruments, les acteurs et les mécaniques de marché essentielles.",
      order: 1,
      lessonIds: [
        "mf-found-l1-action",
        "mf-found-l1-obligation",
        "mf-found-l1-rendement",
        "mf-found-l1-risque",
        "mf-found-l1-marche-primaire",
        "mf-found-l1-marche-secondaire",
        "mf-found-l1-market-cap",
        "mf-found-l1-dividende",
        "mf-found-l1-volume",
        "mf-found-l1-liquidite",
        "mf-found-l1-buyside-sellside",
        "mf-found-l1-acteurs",
        "mf-boss-1-market-basics",
      ],
      bossLessonId: "mf-boss-1-market-basics",
    },
  ],
  lessons: [
    lessonAction,
    lessonObligation,
    lessonRendement,
    lessonRisque,
    lessonMarchePrimaire,
    lessonMarcheSecondaire,
    lessonMarketCap,
    lessonDividende,
    lessonVolume,
    lessonLiquidite,
    lessonBuysideSellside,
    lessonActeurs,
    lessonBossWorld1,
  ],
};
