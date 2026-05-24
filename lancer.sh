#!/bin/bash
export PATH="/opt/homebrew/bin:$PATH"
cd "$(dirname "$0")"

# Ouvre le navigateur après un court délai (laisse le temps au serveur de démarrer)
(sleep 3 && open http://localhost:3210) &

npm run dev -- --port 3210
