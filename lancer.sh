#!/bin/bash
# ─────────────────────────────────────────────────────────────────
#  Finance App — Launcher
#  Double-cliquer ou exécuter : ./lancer.sh
# ─────────────────────────────────────────────────────────────────

export PATH="/opt/homebrew/bin:$PATH"
cd "$(dirname "$0")"

# ── Couleurs ──────────────────────────────────────────────────────
BOLD='\033[1m'
DIM='\033[2m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
RESET='\033[0m'

# ── Header ────────────────────────────────────────────────────────
clear
echo ""
echo -e "  ${BOLD}📈  Finance App${RESET}"
echo -e "  ${DIM}$(pwd)${RESET}"
echo ""
echo -e "  ${DIM}─────────────────────────────────────────${RESET}"
echo ""
echo -e "  ${CYAN}${BOLD}1.${RESET}  🚀  Démarrer l'app         ${DIM}(dev server + ouvre le navigateur)${RESET}"
echo -e "  ${CYAN}${BOLD}2.${RESET}  🔧  Admin UI               ${DIM}(dev server + ouvre /admin)${RESET}"
echo -e "  ${DIM}─────────────────────────────────────────${RESET}"
echo -e "  ${CYAN}${BOLD}3.${RESET}  🧪  Tests                  ${DIM}(vitest run)${RESET}"
echo -e "  ${CYAN}${BOLD}4.${RESET}  👁   Tests en watch         ${DIM}(vitest --watch)${RESET}"
echo -e "  ${CYAN}${BOLD}5.${RESET}  🔍  Typecheck              ${DIM}(tsc --noEmit)${RESET}"
echo -e "  ${CYAN}${BOLD}6.${RESET}  📏  Lint                   ${DIM}(eslint)${RESET}"
echo -e "  ${CYAN}${BOLD}7.${RESET}  ✅  Tout vérifier          ${DIM}(typecheck + lint + tests)${RESET}"
echo -e "  ${DIM}─────────────────────────────────────────${RESET}"
echo -e "  ${CYAN}${BOLD}8.${RESET}  📦  Build production       ${DIM}(next build)${RESET}"
echo -e "  ${CYAN}${BOLD}9.${RESET}  🔄  Mettre à jour          ${DIM}(npm install)${RESET}"
echo ""
echo -e "  ${DIM}Ctrl+C pour quitter${RESET}"
echo ""
echo -ne "  ${BOLD}Choix [1-9] : ${RESET}"
read -r choice

echo ""

case "$choice" in
  1)
    echo -e "  ${GREEN}▶ Démarrage du serveur sur http://localhost:3210${RESET}"
    echo ""
    (sleep 2 && open "http://localhost:3210") &
    npm run dev -- --port 3210
    ;;
  2)
    echo -e "  ${GREEN}▶ Démarrage du serveur — ouverture de /admin${RESET}"
    echo ""
    (sleep 2 && open "http://localhost:3210/admin") &
    npm run dev -- --port 3210
    ;;
  3)
    echo -e "  ${GREEN}▶ Lancement des tests${RESET}"
    echo ""
    npm test
    echo ""
    echo -ne "  ${DIM}Appuyer sur Entrée pour revenir au menu...${RESET}"
    read -r
    exec "$0"
    ;;
  4)
    echo -e "  ${GREEN}▶ Tests en mode watch (Ctrl+C pour arrêter)${RESET}"
    echo ""
    npm run test:watch
    ;;
  5)
    echo -e "  ${GREEN}▶ TypeScript typecheck${RESET}"
    echo ""
    npm run typecheck && echo -e "\n  ${GREEN}✓ Aucune erreur TypeScript${RESET}" || echo -e "\n  ${RED}✗ Erreurs TypeScript détectées${RESET}"
    echo ""
    echo -ne "  ${DIM}Appuyer sur Entrée pour revenir au menu...${RESET}"
    read -r
    exec "$0"
    ;;
  6)
    echo -e "  ${GREEN}▶ ESLint${RESET}"
    echo ""
    npm run lint && echo -e "\n  ${GREEN}✓ Aucune erreur ESLint${RESET}" || echo -e "\n  ${RED}✗ Erreurs ESLint détectées${RESET}"
    echo ""
    echo -ne "  ${DIM}Appuyer sur Entrée pour revenir au menu...${RESET}"
    read -r
    exec "$0"
    ;;
  7)
    echo -e "  ${YELLOW}▶ Vérification complète (typecheck → lint → tests)${RESET}"
    echo ""
    ERRORS=0

    echo -e "  ${BOLD}[1/3] TypeScript…${RESET}"
    if npm run typecheck 2>&1 | tail -3; then
      echo -e "  ${GREEN}✓ TypeScript OK${RESET}"
    else
      echo -e "  ${RED}✗ TypeScript FAILED${RESET}"
      ERRORS=$((ERRORS + 1))
    fi
    echo ""

    echo -e "  ${BOLD}[2/3] ESLint…${RESET}"
    if npm run lint; then
      echo -e "  ${GREEN}✓ ESLint OK${RESET}"
    else
      echo -e "  ${RED}✗ ESLint FAILED${RESET}"
      ERRORS=$((ERRORS + 1))
    fi
    echo ""

    echo -e "  ${BOLD}[3/3] Tests…${RESET}"
    if npm test; then
      echo -e "  ${GREEN}✓ Tests OK${RESET}"
    else
      echo -e "  ${RED}✗ Tests FAILED${RESET}"
      ERRORS=$((ERRORS + 1))
    fi
    echo ""

    if [ "$ERRORS" -eq 0 ]; then
      echo -e "  ${GREEN}${BOLD}✅ Tout est OK — prêt à pousser !${RESET}"
    else
      echo -e "  ${RED}${BOLD}✗ $ERRORS vérification(s) échouée(s)${RESET}"
    fi
    echo ""
    echo -ne "  ${DIM}Appuyer sur Entrée pour revenir au menu...${RESET}"
    read -r
    exec "$0"
    ;;
  8)
    echo -e "  ${GREEN}▶ Build production${RESET}"
    echo ""
    npm run build
    echo ""
    echo -ne "  ${DIM}Appuyer sur Entrée pour revenir au menu...${RESET}"
    read -r
    exec "$0"
    ;;
  9)
    echo -e "  ${GREEN}▶ npm install${RESET}"
    echo ""
    npm install
    echo ""
    echo -ne "  ${DIM}Appuyer sur Entrée pour revenir au menu...${RESET}"
    read -r
    exec "$0"
    ;;
  *)
    echo -e "  ${RED}Choix invalide.${RESET}"
    sleep 1
    exec "$0"
    ;;
esac
