export interface CardTheme {
  label: string;
  icon: string;
  cardBg: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  answerBg: string;
  buttonBg: string;
  buttonHover: string;
}

export const CARD_THEMES: Record<string, CardTheme> = {
  definition: {
    label: "Définition",
    icon: "📖",
    cardBg: "bg-blue-50",
    accent: "border-l-blue-500",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
    answerBg: "bg-white",
    buttonBg: "bg-blue-600",
    buttonHover: "hover:bg-blue-700",
  },
  intuition: {
    label: "Intuition",
    icon: "💡",
    cardBg: "bg-purple-50",
    accent: "border-l-purple-500",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-700",
    answerBg: "bg-white",
    buttonBg: "bg-purple-600",
    buttonHover: "hover:bg-purple-700",
  },
  example: {
    label: "Exemple",
    icon: "🔍",
    cardBg: "bg-emerald-50",
    accent: "border-l-emerald-500",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    answerBg: "bg-white",
    buttonBg: "bg-emerald-600",
    buttonHover: "hover:bg-emerald-700",
  },
  formula: {
    label: "Formule",
    icon: "🔢",
    cardBg: "bg-amber-50",
    accent: "border-l-amber-500",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    answerBg: "bg-white",
    buttonBg: "bg-amber-500",
    buttonHover: "hover:bg-amber-600",
  },
  comparison: {
    label: "Comparaison",
    icon: "↔",
    cardBg: "bg-indigo-50",
    accent: "border-l-indigo-500",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-700",
    answerBg: "bg-white",
    buttonBg: "bg-indigo-600",
    buttonHover: "hover:bg-indigo-700",
  },
  mechanism: {
    label: "Mécanisme",
    icon: "⚙",
    cardBg: "bg-cyan-50",
    accent: "border-l-cyan-500",
    badgeBg: "bg-cyan-100",
    badgeText: "text-cyan-700",
    answerBg: "bg-white",
    buttonBg: "bg-cyan-600",
    buttonHover: "hover:bg-cyan-700",
  },
  "quick-calculation": {
    label: "Calcul rapide",
    icon: "＝",
    cardBg: "bg-emerald-50",
    accent: "border-l-emerald-500",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    answerBg: "bg-white",
    buttonBg: "bg-emerald-600",
    buttonHover: "hover:bg-emerald-700",
  },
  "market-culture": {
    label: "Culture marché",
    icon: "◆",
    cardBg: "bg-slate-50",
    accent: "border-l-slate-500",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-700",
    answerBg: "bg-white",
    buttonBg: "bg-slate-700",
    buttonHover: "hover:bg-slate-800",
  },
  trap: {
    label: "Piège",
    icon: "⚠️",
    cardBg: "bg-red-50",
    accent: "border-l-red-500",
    badgeBg: "bg-red-100",
    badgeText: "text-red-700",
    answerBg: "bg-white",
    buttonBg: "bg-red-600",
    buttonHover: "hover:bg-red-700",
  },
  "interview-question": {
    label: "Question entretien",
    icon: "🎯",
    cardBg: "bg-orange-50",
    accent: "border-l-orange-500",
    badgeBg: "bg-orange-100",
    badgeText: "text-orange-700",
    answerBg: "bg-white",
    buttonBg: "bg-orange-500",
    buttonHover: "hover:bg-orange-600",
  },
  "model-answer": {
    label: "Réponse modèle",
    icon: "✅",
    cardBg: "bg-teal-50",
    accent: "border-l-teal-500",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-700",
    answerBg: "bg-white",
    buttonBg: "bg-teal-600",
    buttonHover: "hover:bg-teal-700",
  },
};

export const DEFAULT_CARD_THEME: CardTheme = {
  label: "Carte",
  icon: "📄",
  cardBg: "bg-gray-50",
  accent: "border-l-gray-400",
  badgeBg: "bg-gray-100",
  badgeText: "text-gray-700",
  answerBg: "bg-white",
  buttonBg: "bg-gray-600",
  buttonHover: "hover:bg-gray-700",
};

export function getCardTheme(type: string): CardTheme {
  return CARD_THEMES[type] ?? DEFAULT_CARD_THEME;
}
