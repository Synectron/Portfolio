#!/usr/bin/env bash
set -euo pipefail

if [ "${1-}" = "--ci" ]; then
  npm ci
fi

npm run build
npx firebase deploy --only hosting
